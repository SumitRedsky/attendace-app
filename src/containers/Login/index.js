import React, { Component }  from 'react';
import {TextInput,Image,View,Text,Button,StyleSheet,TouchableOpacity} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome';
import {loginService} from '../../services/login.service';
import * as colors from "../../constants/colors";
import * as utility from "../../utility/index";
import * as commanApi from "../../store/commanApi";
import SkeletonContent from "react-native-skeleton-content-nonexpo";

export default class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password:'',
      email:'',
      otp:'',
      confirmPassword:'',
      loading:false,
      data:null,
      isLogin:true,
      isResetPassword:false,
      isVisibleLoading:false
    };
  };
  componentDidMount() {
    this.subscription = loginService.getLoggedIn().subscribe(states=>{
      if(states==true){
        this.setState({isLogin:true,isResetPassword:false});
      }else{
        this.setState({isLogin:false,isResetPassword:false});
      }
    })
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  onForgotPassword=()=>{
    this.setState({isLogin : false});
  }
  onSubmitResetPassword=()=>{
    // validation 
    if(utility.isFieldEmpty(this.state.otp &&this.state.password&&this.state.confirmPassword)){
      alert('All fields are required');
      return
    }
    if(utility.isValidComparedPassword(this.state.password,this.state.confirmPassword)){
      alert('Password and confirm password should be same');
      return
    }
    // set headers
    let headers= {
      Accept: 'application/json',
     'Content-Type': 'application/json',
    }
    // set body
    let body={
      email:this.state.email,
      otp:this.state.otp,
      newPassword:this.state.password
    }
    try{
      let response = commanApi.postDataApi(BASE_URL+"users/resetPassword",body,headers)
      response.then(res=>{
        if(res.data){
          alert(res.data)
          this.state.password='';
          this.state.email='';
          this.state.otp='',
          this.state.confirmPassword=''
          loginService.loggedIn(true);
        }else{
          console.log('if no data in response:',res.error)
          alert(res.error)
        }

      }).catch(error=>{
        console.log('api problem:',error.error)
        alert(error.error)
      })
    }catch(err){
      console.log('another problem:',err)
     alert(err)
    }
   
  }
  onSendOtp=()=>{
    // validation 
    if(utility.isFieldEmpty(this.state.email)){
      alert('Email is required');
      return
    }
    if(utility.isValidEmail(this.state.email)){
      alert('Email is not valid');
      return
    }
  // set headers
    let headers={
      Accept: 'application/json',
     'Content-Type': 'application/json',
    }
    let body={
      email:this.state.email
    }
    try{
      let response = commanApi.postDataApi(BASE_URL+"users/forgotPassword",body,headers)
      response.then(res=>{
        if(res.data){
          alert(res.data)
          this.setState({isResetPassword:true});
        }else{
          console.log('if no data in response:',res.error)
          alert(res.error)
        }
      }).catch(error=>{
        console.log('api problem:',error.error)
        alert(error.error)
      })
    }catch(err){
      console.log('another problem:',err)
     alert(err)
    }
   
  }
  onBackButton=()=>{
    if(this.state){
      if(this.state.isLogin ==false&&this.state.isResetPassword==false){
        loginService.loggedIn(true)
        this.setState({isLogin:true,isResetPassword:false});
        this.state.email='';
      }else if(this.state.isLogin ==false&&this.state.isResetPassword==true){
        loginService.loggedIn(false)
      }
    }
  }
  onLogin=()=>{
      this.setState({isVisibleLoading:true})
    
      // validation 
      if(utility.isFieldEmpty(this.state.userName &&this.state.password)){
        alert('All fields are required');
        return
      }
      if(utility.passwordPattern(this.state.password)){
        alert('Password limit should be greater than 5 ');
        return
      }
      
      // set headers
      const headers={
        Accept: 'application/json',
       'Content-Type': 'application/json',
      }
      // set body
      let body={
        userName:this.state.userName,
        password:this.state.password
      }
      try{
        let response = commanApi.postDataApi(BASE_URL+"users/login",body,headers)
        response.then(res=>{
          if(res.data){
            this.setState({
              data: res.data,
              isVisibleLoading:false
            })
            AsyncStorage.setItem('userToken',this.state.data.token,()=>{
              AsyncStorage.getItem('userToken', (err, result) => {
                console.log("token:",result);
              });
            })
            AsyncStorage.setItem('userId',this.state.data._id,()=>{
              AsyncStorage.getItem('userId', (err, result) => {
                console.log("userId:",result);
              });
            })
            this.setState({userName:'',password:''});
            this.props.navigation.navigate("Home");
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
  render() {
    let form
    const { navigate } = this.props.navigation
    const { Container,BackButton,Icon,Heading,InputBox,LoginButton,LoginText,ForgotPasswordText,BottomText,Logo}=styles
    
    if(this.state.isLogin==true){
      if(this.state.isVisibleLoading==false){
        form=(
          <View style={Container}>
          <Image style={Icon} source={require('../../assets/app-icon.png')} />
          <Text style={Heading}>Attendance</Text>
          <TextInput placeholder="User name" style={InputBox} onChangeText={(userName) => this.setState({userName})}
            value={this.state.userName}/>
          <TextInput secureTextEntry={true} placeholder="Password" style={InputBox} onChangeText={(password) => this.setState({password})}
            value={this.state.password}/>
            <TouchableOpacity style={LoginButton} onPress={this.onLogin}>
            <Text style={LoginText} >LOGIN</Text>
           </TouchableOpacity>
           <Text style={ForgotPasswordText} onPress={this.onForgotPassword}>Forgot password ?</Text>
           </View>
         )
      }else{
        form=(
          <View style={{margin:20}}>
          <SkeletonContent containerStyle={{flex: 1,alignItems: "center",marginTop:20}} 
          animationDirection="horizontalLeft"
           isLoading={this.state.isVisibleLoading} 
           layout={[
            { width: 325, height: 45, marginBottom: 50 },
            { width: 325, height: 75, marginBottom: 50 },
            { width: 270, height: 270,borderRadius:270/2 ,marginBottom: 10 },
            { width: 200, height: 30,marginBottom: 40 },
            { width: 325, height: 70,marginBottom: 5 }
          ]}>
         </SkeletonContent>
         </View>
        )
      }
     }else{
       if(this.state.isResetPassword==false){
        form=(
          <View style={Container}>
          <TouchableOpacity onPress={this.onBackButton}  style={{position: 'absolute',zIndex:10,top:10,left:10}}>
          <Icons name="chevron-left" size={25} color={colors.primaryColor}/>
          </TouchableOpacity>
          <Image style={Icon} source={require('../../assets/app-icon.png')} />
          <Text style={Heading}>Forgot password</Text>
          <TextInput placeholder="Email" style={InputBox} onChangeText={(email) => this.setState({email})}
            value={this.state.email}/>
          <TouchableOpacity style={LoginButton}>
          <Text style={LoginText} onPress={this.onSendOtp}>SEND OTP</Text>
          </TouchableOpacity>
        </View>
         )
       }else{
        form=(
          <View style={Container}>
          <TouchableOpacity onPress={this.onBackButton} style={{position: 'absolute',zIndex:10,top:10,left:10}} >
          <Icons name="chevron-left" size={25} color={colors.primaryColor}/>
          </TouchableOpacity>
          <Image style={Icon} source={require('../../assets/app-icon.png')} />
          <Text style={Heading}>Verify otp</Text>
          <TextInput placeholder="Otp" style={InputBox} onChangeText={(otp) => this.setState({otp})}
            value={this.state.otp}/>
          <TextInput placeholder="New password" style={InputBox} onChangeText={(password) => this.setState({password})}
            value={this.state.password}/>
          <TextInput placeholder="Confirm password" style={InputBox} onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            value={this.state.confirmPassword}/>
          <TouchableOpacity onPress={this.onSubmitResetPassword} style={LoginButton}>
          <Text style={LoginText}>Submit</Text>
          </TouchableOpacity>
        </View>
         )
       }
     }
     return form
  }
};











 



      // if(!this.state.userName){
      //   alert('User name is required')
      // }else if(!this.state.password){
      //   alert('Password is required')
      // }else{
      //   let body={
      //     userName:this.state.userName,
      //     password:this.state.password
      //   }
        // axios.post(BASE_URL+"users/login",body,{
        //     headers: {
        //       Accept: 'application/json',
        //      'Content-Type': 'application/json',
        //   }
        // }).then(response => {
        //         console.log('getting data from axios', response.data);
        //         if(response.data.isSuccess==true){
        //           if(response.data.data!=null){
        //             this.setState({
        //               // loading: false,
        //               data: response.data.data
        //           })
        //           AsyncStorage.setItem('userToken',this.state.data.token,()=>{
        //             AsyncStorage.getItem('userToken', (err, result) => {
        //               console.log("token",result);
        //             });
        //           })
        //           this.props.navigation.navigate("Home");
        //           this.setState({userName:'',password:''});
        //           }
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response);
        //         if(error.response){
        //           alert(error.response.data.error)
        //         }
        // });
      // }
    // }


    
    // if(this.state){
    //   if(!this.state.email){
    //     alert('Email is required')
    //   }else{
    //     let body={
    //       email:this.state.email
    //     }
    //     axios.post(BASE_URL+"users/forgotPassword",body,{
    //         headers: {
    //           Accept: 'application/json',
    //          'Content-Type': 'application/json',
    //       }
    //     }).then(response => {
    //             if(response.data.isSuccess==true){
    //               if(response.data.data!=null){
    //                 alert(response.data.data)
    //                 this.setState({isResetPassword:true});
    //               }
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error.response);
    //             if(error.response){
    //               alert(error.response.data.error)
    //        }
    //     });
    //   }
    // }


    // if(this.state){
    //   if(!this.state.otp){
    //     alert('Otp is required')
    //   }else if(!this.state.password){
    //     alert('Password is required')
    //   }else if(!this.state.confirmPassword){
    //     alert('Confirm password is required')
    //   }else if(this.state.password!=this.state.confirmPassword){
    //     alert('Password and confirm password should be same')
    //   }else{
    //     let body={
    //       email:this.state.email,
    //       otp:this.state.otp,
    //       newPassword:this.state.password
    //     }
    //     axios.post(BASE_URL+"users/resetPassword",body,{
    //         headers: {
    //           Accept: 'application/json',
    //          'Content-Type': 'application/json',
    //       }
    //     }).then(response => {
    //             if(response.data.isSuccess==true){
    //               if(response.data.data!=null){
    //                 alert(response.data.data)
    //                 this.state.password='';
    //                 this.state.email='';
    //                 this.state.otp='',
    //                 this.state.confirmPassword=''
    //                 loginService.loggedIn(true);
    //                 // this.setState({isLogin:true,isResetPassword:false});
    //               }
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error.response);
    //             if(error.response){
    //             alert(error.response.data.error)
    //        }
    //     });
    //   }
    // }