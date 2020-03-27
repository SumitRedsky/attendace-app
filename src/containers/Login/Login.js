import React, { Component }  from 'react';
import {TextInput,Image,View,Text,Button,StyleSheet,TouchableOpacity} from 'react-native';
import styles from './LoginStyles';
import axios from 'axios';
import {apiConfig} from '../../config/config';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome';
import {loginService} from '../../services/login.service';

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
      isResetPassword:false
    };
  };
  componentDidMount() {
    this.subscription = loginService.getLoggedIn().subscribe(state=>{
      if(state==true){
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
    if(this.state){
      if(!this.state.otp){
        alert('Otp is required')
      }else if(!this.state.password){
        alert('Password is required')
      }else if(!this.state.confirmPassword){
        alert('Confirm password is required')
      }else if(this.state.password!=this.state.confirmPassword){
        alert('Password and confirm password should be same')
      }else{
        let body={
          email:this.state.email,
          otp:this.state.otp,
          newPassword:this.state.password
        }
        axios.post(apiConfig.baseUrl+"users/resetPassword",body,{
            headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
          }
        }).then(response => {
                if(response.data.isSuccess==true){
                  if(response.data.data!=null){
                    alert(response.data.data)
                    this.state.password='';
                    this.state.email='';
                    this.state.otp='',
                    this.state.confirmPassword=''
                    loginService.loggedIn(true);
                    // this.setState({isLogin:true,isResetPassword:false});
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
    }
  }
  onSendOtp=()=>{
    if(this.state){
      if(!this.state.email){
        alert('Email is required')
      }else{
        let body={
          email:this.state.email
        }
        axios.post(apiConfig.baseUrl+"users/forgotPassword",body,{
            headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
          }
        }).then(response => {
                if(response.data.isSuccess==true){
                  if(response.data.data!=null){
                    alert(response.data.data)
                    this.setState({isResetPassword:true});
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
    }
   
  }
  onBackButton=()=>{
    // window.location.reload();
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
    console.log('gfghgfgfgfghvfgfvgfv')
    // this.setState({
    //   loading:true
    // })
    if(this.state){
      if(!this.state.userName){
        alert('User name is required')
      }else if(!this.state.password){
        alert('Password is required')
      }else{
        let body={
          userName:this.state.userName,
          password:this.state.password
        }
        axios.post(apiConfig.baseUrl+"users/login",body,{
            headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
          }
        }).then(response => {
                console.log('getting data from axios', response.data);
                if(response.data.isSuccess==true){
                  if(response.data.data!=null){
                    this.setState({
                      // loading: false,
                      data: response.data.data
                  })
                  AsyncStorage.setItem('userToken',this.state.data.token,()=>{
                    AsyncStorage.getItem('userToken', (err, result) => {
                      console.log("token",result);
                    });
                  })
                  this.props.navigation.navigate("Home");
                  this.setState({userName:'',password:''});
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
    }
    
  }

  render() {
    let form
    const { navigate } = this.props.navigation
    const { Container,BackButton,Icon,Heading,InputBox,LoginButton,LoginText,ForgotPasswordText,BottomText,Logo}=styles
     
    if(this.state.isLogin==true){
       form=(
        <View style={Container}>
        <Image style={Icon} source={require('../../images/app-icon.png')} />
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
       if(this.state.isResetPassword==false){
        form=(
          <View style={Container}>
          <TouchableOpacity onPress={this.onBackButton}  style={{position: 'absolute',zIndex:10,top:10,left:10}}>
          <Icons name="chevron-left" size={25} color={"#E26429"}/>
          </TouchableOpacity>
          <Image style={Icon} source={require('../../images/app-icon.png')} />
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
          <Icons name="chevron-left" size={25} color={"#E26429"}/>
          </TouchableOpacity>
          <Image style={Icon} source={require('../../images/app-icon.png')} />
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











 {/* <TouchableOpacity style={BackButton} >
          <Icons name="long-arrow-left" size={25} color={"white"}/>
          </TouchableOpacity> */}

// return   (
    
  //     <View style={Container}>
  //       <Image style={Icon} source={require('../../images/app-icon.png')} />
         
  //       <Text style={Heading}>Attendance</Text>
  //       <TextInput placeholder="User name" style={InputBox} onChangeText={(userName) => this.setState({userName})}
  //         value={this.state.userName}/>
  //       <TextInput secureTextEntry={true} placeholder="Password" style={InputBox} onChangeText={(password) => this.setState({password})}
  //         value={this.state.password}/>
  //         <TouchableOpacity style={LoginButton}>
  //         <Text style={LoginText} onPress={this.onLogin}>LOGIN</Text>
  //         {/* <Text style={LoginText} onPress={() => navigate("Home")}>LOGIN</Text> */}
  //        </TouchableOpacity>
  //        <Text style={ForgotPasswordText}>Forgot password ?</Text>
  //     </View>
  // );







// fetch('http://192.168.1.6:6600/api/users/login', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body:body
// })
//   .then(response => response.json())
//   .then(json => {
//     this.setState({
//       jsonData: json.body,
//     });
//     this.props.navigation.navigate("Home");
//   })
//   .catch(error => {
//     console.error(error);
//   });
