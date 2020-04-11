import React, { Component } from 'react';
import {Image,Button, View,TouchableOpacity,ActivityIndicator } from "react-native";
import styles from './styles'
import BottomBar from "../BottomBar";
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {Paragraph, Dialog, Portal } from 'react-native-paper';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../constants/api';
import * as commanApi from "../../store/commanApi";

export default class Home extends Component {
    constructor(props) {
        super(props);
        let currentDate = moment().format("YYYY-MM-DD MMMM dddd");
        this.state = {
            punchData:[],
            isVisibleLoading:false,
            userToken:'',
            userId:'',
            dialogVisible: false,
            isPunchedIn:false,
            isPunchedOut:false,
            isOver:false,
            isPickClicked:false,
            inTime:'00:00:00',
            outTime:'00:00:00',
            inOutDifference:'00:00:00',
            currentDate:currentDate,
            open: false,
            filePath: {},
            data:[],
            fileData: '',
            fileUri: '../../images/user.png',
            image:{
              url:'',
              thumbnail:'',
              resize_url:'',
              resize_thumbnail:''
            },
            query:''
        };

    }
    componentDidMount= async()=> {
      const token= await AsyncStorage.getItem('userToken');
      const userId=await AsyncStorage.getItem('userId');
      let todayDate=moment().format('DD-MM-YYYY');

      this.setState({userToken: token,userId: userId,query:`date=${todayDate}`});
      this.getPunches(this.state.query);
  }

  getPunches=(query)=>{
    try {
      let response = commanApi.getDataApi(BASE_URL+`punches?${query}`, this.state.userToken)
      response.then(res => {
          if (res.data&&res.data.length!=0) {
            console.log("data:",res.data);
            this.setState({isPickClicked:true});
            let inOutDiff=res.data[0].totalWorkedHours
            let lastPunch=res.data[0].punches[res.data[0].punches.length-1];
            if(lastPunch){
              console.log('last punch:',lastPunch)
            if(lastPunch.punchOut!==null&&lastPunch.punchOut!==undefined&&lastPunch.punchOut!==""){
              this.setState({isPunchedIn:false,inTime:"00:00:00",outTime:'00:00:00',inOutDifference:inOutDiff});
            }else{
              this.setState({inTime:lastPunch.punchIn,inOutDifference:'00:00:00',isPunchedIn:true});
            }
          }
          }
          else {
            console.log("data:",res.data);
            this.setState({isPickClicked:false});
          }
          // this.setState({data:res.data})
      }).catch(error => {
          alert("Something went wrong",error)
      })
  }
  catch (err) {
    alert(err)
  }
  }
  getPunchesData = async(query)=>{
    try {
      let response = commanApi.getDataApi(BASE_URL+`punches?${query}`, this.state.userToken)
      response.then(res => {
          this.setState({data:res.data})
      }).catch(error => {
          alert("Something went wrong",error)
      })
    }catch (err) {
      alert(err)
     }
  }

  
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    handleConfirm = async() => {
        let currentTime= moment().format('h:mm:ss a');
        let startTime
        let duration
        let punchesData=[];

        // let todayDate=moment().format('DD-MM-YYYY');
        // this.setState({query:`date=${todayDate}`});
        // await this.getPunchesData(this.state.query);
        punchesData=this.state.data

        console.log('punchDataaaaaaaaaaaaaaaaa:',punchesData)
        if(punchesData ){
        if(punchesData.length == 0){
          this.state.inTime=currentTime

          startTime=moment().format('h:mm:ss a');
          startTime = moment(startTime, "hh:mm:ss a");
          currentTime = moment(currentTime, "hh:mm:ss a");

          duration = moment.duration(startTime.diff(currentTime));
          let body={
            userId:this.state.userId,
            punchIn:this.state.inTime,
            image:this.state.image
          }
          let headers={ 
          'Content-Type': 'application/json',
          'x-access-token': this.state.userToken,
          }
          try{
            this.setState({isVisibleLoading:true});
            let response = commanApi.postDataApi(BASE_URL+"punches",body,headers)
            response.then(res=>{
              if(res.data){
                console.log('punch in data:',res.data)
                AsyncStorage.setItem('punchId',res.data._id,()=>{
                  AsyncStorage.getItem('punchId', (err, result) => {
                    console.log("punchId:",result);
                  });
                })
                if(res.data.punches&&res.data.punches.length!=0){
                  let punch=res.data.punches[res.data.punches.length-1]
                  AsyncStorage.setItem('punchIdForUpdate',punch._id,()=>{
                    AsyncStorage.getItem('punchIdForUpdate', (err, result) => {
                      console.log("punchIdForUpdate:",result);
                    });
                  })
                }
                this.setState({isVisibleLoading:false,isPunchedIn:true,data:res.data })
              }else{
                this.setState({isVisibleLoading:false});
                console.log('if no data in response:',res.error)
                alert(res.error)
              }
            }).catch(error=>{
              this.setState({isVisibleLoading:false})
              console.log('api problem:',error.error)
              alert(error.error)
            })
          }catch(err){
            this.setState({isVisibleLoading:false})
            console.log('another problem:',err)
           alert(err)
          }
        }else if(punchesData[0].punches && punchesData[0].punches.length<4){
          let currentPunches=[]
          currentPunches=punchesData[0].punches
          let lastPunch=currentPunches[currentPunches.length-1];
          
          if(lastPunch){
            let punchId=await AsyncStorage.getItem('punchId');
            let body
            if(lastPunch.punchOut!==null&&lastPunch.punchOut!==undefined&&lastPunch.punchOut!==""){
              this.state.inTime=currentTime
              startTime=moment().format('h:mm:ss a');
              startTime = moment(startTime, "hh:mm:ss a");
              currentTime = moment(currentTime, "hh:mm:ss a");

              duration = moment.duration(startTime.diff(currentTime));
               body={
                punchIn:this.state.inTime
              }
            }else{
              this.state.outTime=currentTime
              currentTime = moment(currentTime, "hh:mm:ss a");
              startTime=moment(this.state.inTime, "hh:mm:ss a");
              duration = moment.duration(currentTime.diff(startTime));

              let punchIdForUpdate=await AsyncStorage.getItem('punchIdForUpdate');
              body={
                punchId:punchIdForUpdate,
                punchOut:this.state.outTime
              }
            }
            try{
              this.setState({isVisibleLoading:true});
              let response = commanApi.putDataApi(BASE_URL+`punches/${punchId}`,body,this.state.userToken)
              response.then(res=>{
                if(res.data){
                  if(res.data.punches&&res.data.punches.length < 4){
                    let endPunch=res.data.punches[res.data.punches.length-1]
                    if(endPunch){
                      if(endPunch.punchOut!==null&&endPunch.punchOut!==undefined&&endPunch.punchOut!==""){
                        if(res.data.punches.length == 3){
                        this.setState({isVisibleLoading:false,isPunchedOut:true,isPunchedIn:true,isOver:true,inOutDifference:res.data.totalWorkedHours})
                        }else{
                          this.setState({isPunchedIn:false,isPunchedOut:false})
                        }
                      }else{
                        AsyncStorage.setItem('punchIdForUpdate',endPunch._id,()=>{
                          AsyncStorage.getItem('punchIdForUpdate', (err, result) => {
                            console.log("punchIdForUpdate:",result);
                          });
                        })
                        this.setState({isPunchedIn:true,isPunchedOut:false})
                      }
                    }
                    this.setState({data:res.data,isVisibleLoading:false,inOutDifference:res.data.totalWorkedHours})
                  }
                  
                  
                  // if(res.data.punches&&res.data.punches.length<4){
                  //   console.log('punch in data:',res.data)
                  //     let punch=res.data.punches[res.data.punches.length-1]
                  //     AsyncStorage.setItem('punchIdForUpdate',punch._id,()=>{
                  //       AsyncStorage.getItem('punchIdForUpdate', (err, result) => {
                  //         console.log("punchIdForUpdate:",result);
                  //       });
                  //     })
                  //   // this.setState({isVisibleLoading:false,isPunchedOut:true,isPunchedIn:false,inOutDifference:res.data.totalWorkedHours})
                  //   this.setState({isVisibleLoading:false,inOutDifference:res.data.totalWorkedHours})
                  // }else if(res.data.punches&&res.data.punches.length==3){
                    
                  //   this.setState({isVisibleLoading:false,isPunchedOut:true,isPunchedIn:true,isOver:true,inOutDifference:res.data.totalWorkedHours})
                  // }
                }else{
                  this.setState({isVisibleLoading:false});
                  console.log('if no data in response:',res.error)
                  alert(res.error)
                }
              }).catch(error=>{
                this.setState({isVisibleLoading:false})
                console.log('api problem:',error.error)
                alert(error.error)
              })
            }catch(err){
              this.setState({isVisibleLoading:false})
              console.log('another problem:',err)
             alert(err)
            } 
          }
        }
      }
        var hours=parseInt(duration.asHours())
        hours=hours<10?`0${hours}`:hours
        var minutes=parseInt(duration.asMinutes())%60
        minutes=minutes<10?`0${minutes}`:minutes
        var seconds=parseInt(duration.asSeconds())%60
        seconds=seconds<10?`0${seconds}`:seconds

        this.state.inOutDifference=hours+":"+minutes+":"+ seconds
        this.setState({ dialogVisible: false,data:[]});
        punchesData=[];
        // this.setState({ dialogVisible: false,isPunchedIn:true });
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
    onUploadImage=(file)=>{
      var formData = new FormData();
      let fileData={
        uri:file.uri,
        name:file.fileName,
        type:file.type
      }
      formData.append('file', fileData);
      const headers={
        'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
         'x-access-token': this.state.userToken
      }
      try{
        this.setState({isVisibleLoading:true});
        let response = commanApi.uploadImageApi(BASE_URL+"files",formData,headers)
        response.then(res=>{
          if(res.data){
            console.log('filesssssssssssssssssss:',res.data)
            if(res.data!=null){
              this.setState({
                isVisibleLoading:false,
                fileUri: res.data.image.resize_url,
                isPickClicked:true,
                image:{
                  url:res.data.image.url,
                  thumbnail:res.data.image.thumbnail,
                  resize_url:res.data.image.resize_url,
                  resize_thumbnail:res.data.image.resize_thumbnail
                }
              });

            } 
          }else{
            this.setState({isVisibleLoading:false});
            console.log('if no data in response:',res.error)
            alert(res.error)
          }
        }).catch(error=>{
          this.setState({isVisibleLoading:false});
          console.log('api problem:',error.error)
          alert(error.error)
        })
      }catch(err){
        this.setState({isVisibleLoading:false});
        console.log('another problem:',err)
       alert(err)
      }
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
            this.onUploadImage(response);
          }
        });
      }
    
    render() {
        const {DateText,Header,MenuIcon,Box,InOutTime,CurrentDate,UserName,PunchInHourText,PunchOutHourText,Time,InIcon,OutIcon,HoursContainer,MainContainer,ColoredContainer,DateTimeContainer,BottomContainer,DialogBox,ConfirmButton} = styles
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
             </TouchableOpacity>:!this.state.isOver?

             <TouchableOpacity onPress={this.showDialog}>
             <LinearGradient colors={this.state.isPunchedIn ? ['white','white', '#DF6923']:['white','white', 'green']} style={DateTimeContainer}>
              <Text style={this.state.isPunchedIn?PunchOutHourText:PunchInHourText}>TOTAL HOURS</Text>
              <Text style={{fontSize:38}}>{this.state.inOutDifference}</Text>
              {/* <Text style={{fontSize:38}}>{this.state.isPunchedIn ? `${this.state.inOutDifference}` :'00:00:00'}</Text> */}
              <Text style={{fontSize:16,color:"white"}}>Please press here</Text>
              <Text style={{fontSize:16,color:"white"}}>{this.state.isPunchedIn?'PUNCH OUT':'PUNCH IN'}</Text>
             </LinearGradient>
             </TouchableOpacity>:

            <TouchableOpacity onPress={this.onLaunchCamera}>
            <LinearGradient colors={['white','purple','purple']} style={DateTimeContainer}>
            <Text style={Box}>Over</Text>
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
            <Text style={DateText}>{this.state.currentDate}</Text>
            </View>
            <BottomBar navigation={this.props.navigation} />
            <View style={{ position: 'absolute', top:"50%",right: 0, left: 0 }}>
            <ActivityIndicator  animating={this.state.isVisibleLoading} size="large" color="#0000ff" />
            </View>
            </>
            
        );
    }
}





// if(this.state.isPunchedIn==false){
        //   // this.setState({inTime:currentTime});
        //     this.state.inTime=currentTime
  
        //     startTime=moment().format('h:mm:ss a');
        //     startTime = moment(startTime, "hh:mm:ss a");
        //     currentTime = moment(currentTime, "hh:mm:ss a");

        //     duration = moment.duration(startTime.diff(currentTime));
            
        //     let body={
        //         userId:this.state.userId,
        //         punchIn:this.state.inTime,
        //         image:this.state.image
        //     }
        //     let headers={
        //       'Content-Type': 'application/json',
        //       'x-access-token': this.state.userToken,
        //     }
        //     try{
        //       this.setState({isVisibleLoading:true});
        //       let response = commanApi.postDataApi(BASE_URL+"punches",body,headers)
        //       response.then(res=>{
        //         if(res.data){
        //           console.log('punch in data:',res.data)
        //           AsyncStorage.setItem('punchId',res.data._id,()=>{
        //             AsyncStorage.getItem('punchId', (err, result) => {
        //               console.log("punchId:",result);
        //             });
        //           })
        //           if(res.data.punches&&res.data.punches.length!=0){
        //             let punch=res.data.punches[res.data.punches.length-1]
        //             AsyncStorage.setItem('punchIdForUpdate',punch._id,()=>{
        //               AsyncStorage.getItem('punchIdForUpdate', (err, result) => {
        //                 console.log("punchIdForUpdate:",result);
        //               });
        //             })
        //           }
        //           this.setState({isVisibleLoading:false,isPunchedIn:true })
        //         }else{
        //           this.setState({isVisibleLoading:false});
        //           console.log('if no data in response:',res.error)
        //           alert(res.error)
        //         }
        //       }).catch(error=>{
        //         this.setState({isVisibleLoading:false})
        //         console.log('api problem:',error.error)
        //         alert(error.error)
        //       })
        //     }catch(err){
        //       this.setState({isVisibleLoading:false})
        //       console.log('another problem:',err)
        //      alert(err)
        //     }    
        // }else{
        //     this.state.outTime=currentTime
        //     currentTime = moment(currentTime, "hh:mm:ss a");
        //     startTime=moment(this.state.inTime, "hh:mm:ss a");
        //     duration = moment.duration(currentTime.diff(startTime));

        //     let punchId=await AsyncStorage.getItem('punchId');
        //     let punchIdForUpdate=await AsyncStorage.getItem('punchIdForUpdate');
        //     let body={
        //      punchId:punchIdForUpdate,
        //      punchOut:this.state.outTime
        //     }
        //     try{
        //       this.setState({isVisibleLoading:true});
        //       let response = commanApi.putDataApi(BASE_URL+`punches/${punchId}`,body,this.state.userToken)
        //       response.then(res=>{
        //         if(res.data){
        //           console.log('punch in data:',res.data)
        //           this.setState({isVisibleLoading:false,isPunchedOut:true,isPunchedIn:false,inOutDifference:res.data.totalWorkedHours})
        //         }else{
        //           this.setState({isVisibleLoading:false});
        //           console.log('if no data in response:',res.error)
        //           alert(res.error)
        //         }
        //       }).catch(error=>{
        //         this.setState({isVisibleLoading:false})
        //         console.log('api problem:',error.error)
        //         alert(error.error)
        //       })
        //     }catch(err){
        //       this.setState({isVisibleLoading:false})
        //       console.log('another problem:',err)
        //      alert(err)
        //     } 
        //     // this.setState({isPunchedOut:true});
        // }