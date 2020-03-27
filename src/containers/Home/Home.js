import React, { Component } from 'react';
import {Image,Button, View,TouchableOpacity } from "react-native";
import styles from './HomeStyles'
import BottomBar from "../BottomBar/BottomBar";
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {Paragraph, Dialog, Portal } from 'react-native-paper';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {apiConfig} from '../../config/config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        let currentDate = moment().format("YYYY-MM-DD MMMM dddd");
        this.state = {
            userToken:'',
            dialogVisible: false,
            isPunchedIn:false,
            isPunchedOut:false,
            isPickClicked:false,
            inTime:'00:00:00',
            outTime:'00:00:00',
            inOutDifference:'',
            currentDate:currentDate,
            open: false,
            filePath: {},
            data:{},
            fileData: '',
            fileUri: '../../images/user.png',
            file:{
              fieldName:'',
              name:'',
              originalFilename:'',
              path:'',
              type:'' 
            },
            image:{
              url:'',
              thumbnail:'',
              resize_url:'',
              resize_thumbnail:''
            }
        };

    }
    componentDidMount() {
      AsyncStorage.getItem('userToken').then((userToken) => {
          if(userToken){
              this.setState({userToken: userToken});
          }
      });
  }
    
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    handleConfirm = () => {
        let currentTime= moment().format('h:mm:ss a');
        let startTime
        let duration
        if(this.state.isPunchedIn==false){
            this.state.inTime=currentTime

            startTime=moment().format('h:mm:ss a');
            startTime = moment(startTime, "hh:mm:ss a");
            currentTime = moment(currentTime, "hh:mm:ss a");

            duration = moment.duration(startTime.diff(currentTime));
            
            let body={
                userId:this.state.userId,
                punchIn:this.state.startTime,
                image:this.state.image
              }
              axios.post(apiConfig.baseUrl+"punches",body,{
                  headers: {
                   'Content-Type': 'application/json',
                   'x-access-token': this.state.userToken,
                }
              }).then(response => {
                      console.log('getting data from axios', response.data);
                      if(response.data.isSuccess==true){
                        if(response.data.data!=null){
                          this.setState({
                            // loading: false,
                            data: response.data.data
                        })
                        }
                      }
                  })
                  .catch(error => {
                      console.log(error.response);
                      if(error.response){
                      alert(error.response.data.error)
                }
              });

        }else{
            this.state.outTime=currentTime
            currentTime = moment(currentTime, "hh:mm:ss a");
            startTime=moment(this.state.inTime, "hh:mm:ss a");

            duration = moment.duration(currentTime.diff(startTime));
            this.setState({isPunchedOut:true});
        }
        var hours=parseInt(duration.asHours())
        hours=hours<10?`0${hours}`:hours
        var minutes=parseInt(duration.asMinutes())%60
        minutes=minutes<10?`0${minutes}`:minutes
        var seconds=parseInt(duration.asSeconds())%60
        seconds=seconds<10?`0${seconds}`:seconds

        this.state.inOutDifference=hours+":"+minutes+":"+ seconds
        this.setState({ dialogVisible: false,isPunchedIn:true });
    };
    closeDialog=()=>{
        this.setState({ dialogVisible: false});  
    }
    openSideNav=()=>{
        this.props.navigation.navigate("SideDrawer",{screen:"Home"})
    }
    toggleOpen = () => {
        this.setState({ open: !this.state.open });
    };
    drawerContent = () => {
        return (
          <TouchableOpacity onPress={this.toggleOpen} style={styles.AnimatedBox}>
            <Text>Close</Text>
          </TouchableOpacity>
        );
    };
    onUploadImage=()=>{
      var formData = new FormData();
      formData.append('file', this.state.file);
      

      axios.post(apiConfig.baseUrl+"files",{
        headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
         'x-access-token': this.state.userToken
      },
      data:formData
      }).then(response => {
            console.log('getting data from axios', response.data);
            if(response.data.isSuccess==true){
              if(response.data.data!=null){
                this.setState({
                  // loading: false,
                  image: response.data.data
              })
              }
            }
        })
        .catch(error => {
            console.log(error.response);
            if(error.response){
            alert(error.response.data.error)
      }
      });  


    }
    onLaunchCamera = () => {
        let options = {
            cameraType : 'front',
            storageOptions: {
            skipBackup: true,
            path: 'images',
          }
        };
        ImagePicker.launchCamera(options, (response) => {
          console.log('Response = ', response);
          
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            // let uri=source.uri
            // let urlll=new File(Environment.getExternalStorageDirectory(), "Notes");
            // console.log('urlllllllllllllll:',urlll)
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri,
              isPickClicked:true,
              file:{
                fieldName:'file',
                name:response.fileName,
                originalFilename:response.fileName,
                path:response.uri,
                type:response.type
              }
            });
            this.onUploadImage();
          }
        });
      }
    
    render() {
        // let icon = require(this.state.fileUri)
        const {Header,MenuIcon,Box,InOutTime,CurrentDate,UserName,PunchInHourText,PunchOutHourText,Time,InIcon,OutIcon,HoursContainer,MainContainer,ColoredContainer,DateTimeContainer,BottomContainer,DialogBox,ConfirmButton} = styles
        return (
            <>
            <View style={{padding:16}}>

            <View style={Header}>
            {/* <Icon name="bars" size={30} style={MenuIcon}/> */}
            <Image style={{height:50,width:50,borderRadius:50/2}} source={{uri: this.state.fileUri}}/>
            <Text style={UserName}>Meenu</Text>
            <Text >              </Text>
            </View>
           
            <View style={InOutTime}>
            <View>
            <Text style={{fontSize:18,color:"#57AA62"}}>In Time</Text>
            <Text style={Time}>{this.state.inTime}</Text>
            <Icon name="arrow-right" size={20} style={InIcon}/>
            </View>

            <View>
            <Text style={{fontSize:18,color:"#DE5F68"}}>Out Time</Text>
            <Text style={Time}>{this.state.outTime}</Text>
            <Icon name="arrow-up" size={20} style={OutIcon}/>
            </View>
            </View>
            </View>
            
            <View style={HoursContainer}>
             <View style={[MainContainer,HoursContainer]}>
             <View style={[ColoredContainer,HoursContainer]}>
             {!this.state.isPickClicked ?

             <TouchableOpacity onPress={this.onLaunchCamera}>
             <LinearGradient colors={['white','grey','gray']} style={DateTimeContainer}>
             <Text style={Box}>Take Photo</Text>
             </LinearGradient>
             </TouchableOpacity>:

             <TouchableOpacity onPress={this.showDialog}>
             <LinearGradient colors={this.state.isPunchedIn ? ['white','white', '#DF6923']:['white','white', 'green']} style={DateTimeContainer}>
              <Text style={this.state.isPunchedIn?PunchOutHourText:PunchInHourText}>TOTAL HOURS</Text>
              <Text style={{fontSize:38}}>{this.state.isPunchedIn ? `${this.state.inOutDifference}` :'00:00:00'}</Text>
              <Text style={{fontSize:16,color:"white"}}>Please press here</Text>
              <Text style={{fontSize:16,color:"white"}}>{this.state.isPunchedIn?'PUNCH OUT':'PUNCH IN'}</Text>
             </LinearGradient>
             </TouchableOpacity>

            }
            {/* dialog box */}
             <Portal>
            <Dialog visible={this.state.dialogVisible} onDismiss={this.closeDialog} style={DialogBox}>
            <Dialog.Content>
              <Paragraph style={{fontSize:16,marginTop:10}}>{this.state.isPunchedIn?'Successfully checked out':'Successfully checked in'}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
            <TouchableOpacity style={ConfirmButton} onPress={this.handleConfirm}><Text style={{color:"white"}}>Ok</Text></TouchableOpacity>
            </Dialog.Actions>
             </Dialog>
            </Portal>

             </View>
             </View>
            </View>

            <View style={CurrentDate}>
            <Text style={{fontSize:17,color:"#DF6923"}}>{this.state.currentDate}</Text>
            </View>
            <BottomBar navigation={this.props.navigation} />
            </>
            
        );
    }
}