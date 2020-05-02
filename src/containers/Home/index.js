import React, {Component} from 'react';
import {Image, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';
import BottomBar from '../BottomBar';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../constants/api';
import * as commanApi from '../../store/commanApi';
import BackgroundTimer from 'react-native-background-timer';
import {any} from 'prop-types';
import {BackHandler, Alert} from 'react-native';
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  exitAlert,
} from '../../components/HandleBack';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    let currentDate = moment().format('YYYY-MM-DD MMMM dddd');
    this.state = {
      punchData: [],
      isVisibleLoading: false,
      userToken: '',
      userId: '',
      dialogVisible: false,
      isPunchedIn: false,
      isPunchedOut: false,
      isOver: false,
      isPickClicked: false,
      inTime: '00:00:00',
      outTime: '00:00:00',
      inOutDifference: '00:00:00',
      currentDate: currentDate,
      open: false,
      filePath: {},
      data: [],
      fileData: '',
      fileUri: '',
      image: {
        url: '',
        thumbnail: '',
        resize_url: '',
        resize_thumbnail: '',
      },
      query: '',
      seconds: '00',
      minutes: '00',
      hours: '00',
      _interval: any,
    };
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    let todayDate = moment().format('DD-MM-YYYY');

    this.setState({
      userToken: token,
      userId: userId,
      query: `date=${todayDate}&&userId=${userId}`,
    });
    this.getPunches(this.state.query);
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  };
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  getPunches = query => {
    try {
      this.setState({isVisibleLoading: true});
      let response = commanApi.getDataApi(
        BASE_URL + `punches?${query}`,
        this.state.userToken,
      );
      response
        .then(res => {
          if (res.data && res.data.length != 0) {
            this.setState({isPickClicked: true});
            let todayPunches = res.data[0];
            if (todayPunches) {
              let lastPunch =
                todayPunches.punches[todayPunches.punches.length - 1];
              if (lastPunch) {
                if (
                  lastPunch.punchOut !== null &&
                  lastPunch.punchOut !== undefined &&
                  lastPunch.punchOut !== ''
                ) {
                  if (todayPunches.punches.length == 4) {
                    this.setState({
                      isVisibleLoading: false,
                      inTime: '00:00:00',
                      outTime: '00:00:00',
                      isPunchedOut: true,
                      isPunchedIn: true,
                      isOver: true,
                      inOutDifference: todayPunches.totalWorkedHours,
                    });
                  } else {
                    this.setState({
                      inTime: lastPunch.punchIn,
                      outTime: lastPunch.punchOut,
                      isPunchedIn: false,
                      isPunchedOut: false,
                    });
                  }
                  let differenceTime = todayPunches.totalWorkedHours;
                  let parts = differenceTime.split(':');
                  this.setState({
                    inOutDifference: todayPunches.totalWorkedHours,
                    hours: parts[0],
                    minutes: parts[1],
                    seconds: parts[2],
                  });
                } else {
                  this.setState({
                    inTime: lastPunch.punchIn,
                    outTime: '00:00:00',
                    isPunchedIn: true,
                    isPunchedOut: false,
                  });
                }
              }
              this.setState({
                data: res.data,
                isVisibleLoading: false,
                inOutDifference: todayPunches.totalWorkedHours,
              });
            }
          } else {
            console.log('data:', res.data);
            this.setState({isPickClicked: false, isVisibleLoading: false});
          }
        })
        .catch(error => {
          alert('Something went wrong', error);
        });
    } catch (err) {
      alert(err);
    }
  };
  getPunchesData = async query => {
    try {
      let response = commanApi.getDataApi(
        BASE_URL + `punches?${query}`,
        this.state.userToken,
      );
      response
        .then(res => {
          this.setState({data: res.data});
        })
        .catch(error => {
          alert('Something went wrong', error);
        });
    } catch (err) {
      alert(err);
    }
  };
  showDialog = () => {
    this.setState({dialogVisible: true});
  };
  handleConfirm = async () => {
    let currentTime = moment().format('h:mm:ss a');
    let punchesData = [];
    punchesData = this.state.data;

    if (punchesData) {
      if (punchesData.length == 0) {
        let body = {
          userId: this.state.userId,
          punchIn: currentTime,
          image: this.state.image,
        };
        let headers = {
          'Content-Type': 'application/json',
          'x-access-token': this.state.userToken,
        };
        try {
          this.setState({isVisibleLoading: true});
          let response = commanApi.postDataApi(
            BASE_URL + 'punches',
            body,
            headers,
          );
          response
            .then(res => {
              if (res.data) {
                console.log('punch in data:', res.data);
                AsyncStorage.setItem('punchId', res.data._id, () => {
                  AsyncStorage.getItem('punchId', (err, result) => {
                    console.log('punchId:', result);
                  });
                });
                if (res.data.punches && res.data.punches.length != 0) {
                  let punch = res.data.punches[res.data.punches.length - 1];
                  AsyncStorage.setItem('punchIdForUpdate', punch._id, () => {
                    AsyncStorage.getItem('punchIdForUpdate', (err, result) => {
                      console.log('punchIdForUpdate:', result);
                    });
                  });
                  this.setState({inTime: res.data.punches[0].punchIn});
                }
                let todayDate = moment().format('DD-MM-YYYY');
                this.setState({
                  query: `date=${todayDate}&&userId=${this.state.userId}`,
                });
                this.getPunchesData(this.state.query);
                this.onStart();
                this.setState({isVisibleLoading: false, isPunchedIn: true});
              } else {
                this.setState({isVisibleLoading: false});
                console.log('if no data in response:', res.error);
                alert(res.error);
              }
            })
            .catch(error => {
              this.setState({isVisibleLoading: false});
              console.log('api problem:', error.error);
              alert(error.error);
            });
        } catch (err) {
          this.setState({isVisibleLoading: false});
          console.log('another problem:', err);
          alert(err);
        }
      } else if (punchesData[0].punches && punchesData[0].punches.length < 5) {
        let currentPunches = [];
        currentPunches = punchesData[0].punches;
        let lastPunch = currentPunches[currentPunches.length - 1];

        if (lastPunch) {
          let punchId = await AsyncStorage.getItem('punchId');
          let body;
          if (
            lastPunch.punchOut !== null &&
            lastPunch.punchOut !== undefined &&
            lastPunch.punchOut !== ''
          ) {
            body = {
              punchIn: currentTime,
            };
          } else {
            let punchIdForUpdate = await AsyncStorage.getItem(
              'punchIdForUpdate',
            );
            this.onStop();
            body = {
              punchId: punchIdForUpdate,
              punchOut: currentTime,
              totalWorkedHours: this.state.inOutDifference,
            };
          }
          try {
            this.setState({isVisibleLoading: true});
            let response = commanApi.putDataApi(
              BASE_URL + `punches/${punchId}`,
              body,
              this.state.userToken,
            );
            response
              .then(res => {
                if (res.data) {
                  if (res.data.punches && res.data.punches.length < 5) {
                    let endPunch =
                      res.data.punches[res.data.punches.length - 1];
                    if (endPunch) {
                      if (
                        endPunch.punchOut !== null &&
                        endPunch.punchOut !== undefined &&
                        endPunch.punchOut !== ''
                      ) {
                        if (res.data.punches.length == 4) {
                          this.setState({
                            isVisibleLoading: false,
                            inTime: '00:00:00',
                            outTime: '00:00:00',
                            isPunchedOut: true,
                            isPunchedIn: true,
                            isOver: true,
                            inOutDifference: res.data.totalWorkedHours,
                          });
                        } else {
                          this.setState({
                            inTime: endPunch.punchIn,
                            outTime: endPunch.punchOut,
                            isPunchedIn: false,
                            isPunchedOut: false,
                          });
                        }
                        let differenceTime = res.data.totalWorkedHours;
                        let parts = differenceTime.split(':');
                        this.setState({
                          inOutDifference: res.data.totalWorkedHours,
                          hours: parts[0],
                          minutes: parts[1],
                          seconds: parts[2],
                        });
                        // this.onStop();
                      } else {
                        AsyncStorage.setItem(
                          'punchIdForUpdate',
                          endPunch._id,
                          () => {
                            AsyncStorage.getItem(
                              'punchIdForUpdate',
                              (err, result) => {
                                console.log('punchIdForUpdate:', result);
                              },
                            );
                          },
                        );
                        this.onStart();
                        this.setState({
                          inTime: endPunch.punchIn,
                          outTime: '00:00:00',
                          isPunchedIn: true,
                          isPunchedOut: false,
                        });
                      }
                    }
                    this.setState({
                      data: res.data,
                      isVisibleLoading: false,
                      inOutDifference: res.data.totalWorkedHours,
                    });
                  }
                  let todayDate = moment().format('DD-MM-YYYY');
                  this.setState({
                    query: `date=${todayDate}&&userId=${this.state.userId}`,
                  });
                  this.getPunchesData(this.state.query);
                } else {
                  this.setState({isVisibleLoading: false});
                  console.log('if no data in response:', res.error);
                  alert(res.error);
                }
              })
              .catch(error => {
                this.setState({isVisibleLoading: false});
                console.log('api problem:', error.error);
                alert(error.error);
              });
          } catch (err) {
            this.setState({isVisibleLoading: false});
            console.log('another problem:', err);
            alert(err);
          }
        }
      }
    }
    this.setState({dialogVisible: false, data: []});
    punchesData = [];
  };
  closeDialog = () => {
    this.setState({dialogVisible: false});
  };
  openSideNav = () => {
    this.props.navigation.navigate('SideDrawer', {screen: 'Home'});
  };
  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };
  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.AnimatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };
  onUploadImage = file => {
    var formData = new FormData();
    let fileData = {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    };
    formData.append('file', fileData);
    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'x-access-token': this.state.userToken,
    };
    try {
      this.setState({isVisibleLoading: true});
      let response = commanApi.uploadImageApi(
        BASE_URL + 'files',
        formData,
        headers,
      );
      response
        .then(res => {
          if (res.data) {
            console.log('filesssssssssssssssssss:', res.data);
            if (res.data != null) {
              this.setState({
                isVisibleLoading: false,
                fileUri: res.data.image.resize_url,
                isPickClicked: true,
                image: {
                  url: res.data.image.url,
                  thumbnail: res.data.image.thumbnail,
                  resize_url: res.data.image.resize_url,
                  resize_thumbnail: res.data.image.resize_thumbnail,
                },
              });
            }
          } else {
            this.setState({isVisibleLoading: false});
            console.log('if no data in response:', res.error);
            alert(res.error);
          }
        })
        .catch(error => {
          this.setState({isVisibleLoading: false});
          console.log('api problem:', error.error);
          alert(error.error);
        });
    } catch (err) {
      this.setState({isVisibleLoading: false});
      console.log('another problem:', err);
      alert(err);
    }
  };
  onLaunchCamera = () => {
    let options = {
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        this.onUploadImage(response);
      }
    });
  };
  onStart = () => {
    this.state._interval = BackgroundTimer.setInterval(() => {
      var num = (Number(this.state.seconds) + 1).toString(),
        count = this.state.minutes;
      let hoursCount = this.state.hours;

      if (Number(this.state.seconds) == 59) {
        count = (Number(this.state.minutes) + 1).toString();
        num = '00';
      }
      if (Number(this.state.minutes) == 59) {
        hoursCount = (Number(this.state.hours) + 1).toString();
        count = '00';
        num = '00';
      }
      this.setState({
        hours: hoursCount.length == 1 ? '0' + hoursCount : hoursCount,
        minutes: count.length == 1 ? '0' + count : count,
        seconds: num.length == 1 ? '0' + num : num,
      });
      this.setState({
        inOutDifference:
          this.state.hours +
          ':' +
          this.state.minutes +
          ':' +
          this.state.seconds,
      });
    }, 1000);
  };
  onStop = () => {
    BackgroundTimer.clearInterval(this.state._interval);
  };
  onExitApp = () => {
    Alert.alert(
      'Confirm exit',
      'Do you want to quit the app?'[
        ({text: 'CANCEL', style: 'cancel'},
        {text: 'OK', onPress: () => BackHandler.exitApp()})
      ],
    );
    return true;
  };
  render() {
    const {
      DateText,
      OverText,
      Header,
      MenuIcon,
      Box,
      InOutTime,
      CurrentDate,
      UserName,
      PunchInHourText,
      PunchOutHourText,
      Time,
      InIcon,
      OutIcon,
      HoursContainer,
      MainContainer,
      ColoredContainer,
      DateTimeContainer,
      BottomContainer,
      DialogBox,
      ConfirmButton,
    } = styles;
    return (
      <>
        {/* <HandleBack onPress={this.onExitApp}> */}
        <View style={{padding: 16}}>
          <View style={Header}>
            {this.state.fileUri ? (
              <Image
                style={{height: 50, width: 50, borderRadius: 50 / 2}}
                source={{uri: this.state.fileUri}}
              />
            ) : (
              <Image
                style={{height: 38, width: 34}}
                source={require('../../assets/menu-icon.png')}
              />
            )}
            <Text style={UserName}>Meenu</Text>
            <Text>        </Text>
          </View>

          <View style={InOutTime}>
            <View>
              <Text style={{fontSize: 18, color: '#57AA62'}}>In Time</Text>
              <Text style={Time}>{this.state.inTime}</Text>
              <Icon name="arrow-right" size={20} style={InIcon} />
            </View>

            <View>
              <Text style={{fontSize: 18, color: '#DE5F68'}}>Out Time</Text>
              <Text style={Time}>{this.state.outTime}</Text>
              <Icon name="arrow-up" size={20} style={OutIcon} />
            </View>
          </View>
        </View>

        <View style={HoursContainer}>
          <View style={[MainContainer, HoursContainer]}>
            <View style={[ColoredContainer, HoursContainer]}>
              {!this.state.isPickClicked ? (
                <TouchableOpacity onPress={this.onLaunchCamera}>
                  <LinearGradient
                    colors={['white', 'grey', 'gray']}
                    style={[
                      DateTimeContainer,
                      {
                        justifyContent: 'center',
                        paddingTop: 0,
                        paddingBottom: 0,
                      },
                    ]}>
                    <Text style={Box}>Take Photo</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : !this.state.isOver ? (
                <TouchableOpacity onPress={this.showDialog}>
                  <LinearGradient
                    colors={
                      this.state.isPunchedIn
                        ? ['white', 'white', '#DF6923']
                        : ['white', 'white', 'green']
                    }
                    style={DateTimeContainer}>
                    <Text
                      style={
                        this.state.isPunchedIn
                          ? PunchOutHourText
                          : PunchInHourText
                      }>
                      TOTAL HOURS
                    </Text>
                    <Text style={{fontSize: 38}}>
                      {this.state.inOutDifference}
                    </Text>
                    {/* <Text style={{fontSize:38}}>{this.state.isPunchedIn ? `${this.state.inOutDifference}` :'00:00:00'}</Text> */}
                    <Text style={{fontSize: 16, color: 'white'}}>
                      Please press here
                    </Text>
                    <Text style={{fontSize: 16, color: 'white'}}>
                      {this.state.isPunchedIn ? 'PUNCH OUT' : 'PUNCH IN'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <LinearGradient
                    colors={['#738A9C', '#526973', '#3A4B52']}
                    style={[DateTimeContainer, {justifyContent: 'center'}]}>
                    <Text style={OverText}>TOTAL HOURS</Text>
                    <Text style={{fontSize: 38, color: 'white'}}>
                      {this.state.inOutDifference}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              {/* dialog box */}
              <Portal>
                <Dialog
                  visible={this.state.dialogVisible}
                  onDismiss={this.closeDialog}
                  style={DialogBox}>
                  <Dialog.Content>
                    <Paragraph style={{fontSize: 16, marginTop: 10}}>
                      {this.state.isPunchedIn
                        ? 'Successfully checked out'
                        : 'Successfully checked in'}
                    </Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <TouchableOpacity
                      style={ConfirmButton}
                      onPress={this.handleConfirm}>
                      <Text style={{color: 'white'}}>Ok</Text>
                    </TouchableOpacity>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </View>
        </View>

        <View style={CurrentDate}>
          <Text style={DateText}>{this.state.currentDate}</Text>
        </View>
        <BottomBar navigation={this.props.navigation} />
        <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
          <ActivityIndicator
            animating={this.state.isVisibleLoading}
            size="large"
            color="#0000ff"
          />
        </View>
        {/* </HandleBack> */}
      </>
    );
  }
}
