import React, { Component } from 'react';
import {TextInput,Label, Text,View,Image,ScrollView,TouchableOpacity } from "react-native";
import styles from './styles'
import BottomBar from "../BottomBar";
import Accordian from "../../shared/Accordian";
import {loginService} from '../../services/login.service';
import {Paragraph, Dialog, Portal } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import{BASE_URL} from '../../constants/api'
import * as commanApi from "../../store/commanApi";
import * as utility from "../../utility/index";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            dialogVisible:false,
            oldPassword:'',
            isChangePassword:false,
            password:'',
            confirmPassword:'',
            userToken:'',
            activeSections: [],
            menu :[
                { 
                  id:'1',
                  title: 'Personal details', 
                  data: 'Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details Personal details',
                },
                { 
                    id:'2',
                    title: 'Professional details', 
                    data: 'Professional details Professional details Professional details Professional details',
                  },
                { 
                  id:'3',
                  title: 'Other details',
                  data: 'Other details Other details Other details Other details'
                }]
        }
    }
    componentDidMount=async()=> {
        const token = await AsyncStorage.getItem('userToken');
        this.setState({userToken: token});
    }
    
    changePassword=()=>{
    this.setState({isChangePassword:true,dialogVisible:true})
    }

    onChangePasswordSubmit=()=>{
        // validation 
      if(utility.isFieldEmpty(this.state.oldPassword && this.state.password && this.state.confirmPassword)){
        alert('All fields are required');
        return
      }
      if(utility.isValidComparedPassword(this.state.password,this.state.confirmPassword)){
        alert('Password and confirm password should be same');
        return
      }
    // set headers
     let headers= {
        'Content-Type': 'application/json',
        'x-access-token': this.state.userToken,
     }
    // set body
    let body={
        password:this.state.oldPassword,
        newPassword:this.state.password
    }
    try{
        let response = commanApi.postDataApi(BASE_URL+"users/changePassword",body,headers)
        response.then(res=>{
          if(res.data){
            alert(res.data);
            this.setState({ dialogVisible: false});
          }else{
            console.log('if no data in response:',res.error)
            alert(res.error)
            this.setState({ dialogVisible: false});
          }
        }).catch(error=>{
          console.log('api problem:',error.error)
          alert(error.error)
          this.setState({ dialogVisible: false});
        })
      }catch(err){
        console.log('another problem:',err)
        alert(err)
        this.setState({ dialogVisible: false});
    }
        
    }

    logOut=()=>{
        this.setState({isChangePassword:false,dialogVisible:true})
    }
    onLogOutSubmit=()=>{
        let body={}
        let headers= {
             'x-access-token': this.state.userToken,
        }
        try{
            let response = commanApi.postDataApi(BASE_URL+"users/logOut",body,headers)
            response.then(res=>{
              if(res.message){
                alert(res.message);
                this.props.navigation.navigate("Login")
              }else{
                console.log('if no data in response:',res.error)
                alert(res.error)
                this.setState({ dialogVisible: false});
              }
            }).catch(error=>{
              console.log('api problem:',error.error)
              alert(error.error)
              this.setState({ dialogVisible: false});
            })
          }catch(err){
            console.log('another problem:',err)
            alert(err)
            this.setState({ dialogVisible: false});
          } 
    }
    closeDialog=()=>{
        this.setState({ dialogVisible: false});  
    }
    renderAccordians=()=> {
        const items = [];
        for (let item of this.state.menu) {
            items.push(
                <Accordian 
                    from='profile'
                    title = {item.title}
                    data = {item.data}
                />
            );
        }
        return items;
    }
    render() {
        const {InputBox,Label,Heading,Container,Profile,UserName,Buttons,RowElement,DialogBox,ConfirmButton} = styles;
        return (
            <>
            <View style={Container}>
            <Image style={Profile} source={require('../../assets/user.png')}/>
            <Text style={UserName}>Meenu</Text>
            </View>
            <View style={{position:"absolute",top:172,bottom:100,marginLeft:15,marginRight:15}}>
    
            <ScrollView>{ this.renderAccordians() }</ScrollView>

            <TouchableOpacity style={[Buttons,{marginTop:12}]} onPress={this.changePassword}>
                <Text style={{color:'white'}}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Buttons} onPress={this.logOut}>
                <Text style={{color:'white'}}>Log out</Text>
            </TouchableOpacity>

            {/* dialog box */}
            <Portal>
            <Dialog visible={this.state.dialogVisible} onDismiss={this.closeDialog} style={DialogBox}>
            <Dialog.Content>{this.state.isChangePassword?
            <View>
            <Text style={Heading}>Change password</Text>
            <View style={RowElement}>
            <Text style={Label}>Old password</Text><TextInput placeholder="Old password" style={InputBox} onChangeText={(oldPassword) => this.setState({oldPassword})}
            value={this.state.oldPassword}/>
            </View>
            <View style={RowElement}>
            <Text style={Label}>New password</Text><TextInput secureTextEntry={true} placeholder="New password" style={InputBox} onChangeText={(password) => this.setState({password})}
            value={this.state.password}/>
            </View>
            <View style={RowElement}>
            <Text style={Label}>Confirm password</Text><TextInput secureTextEntry={true} placeholder="Confirm password" style={InputBox} onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            value={this.state.confirmPassword}/>
            </View>
            </View>:
            <View><Text style={{fontSize:15}}>Do you really want to logout</Text></View>
            }
            </Dialog.Content>
            <Dialog.Actions>
            <TouchableOpacity style={ConfirmButton} onPress={this.closeDialog}><Text style={{color:"white"}}>Cancel</Text></TouchableOpacity>
            {this.state.isChangePassword?
            <TouchableOpacity onPress={this.onChangePasswordSubmit} style={ConfirmButton} ><Text style={{color:"white"}}>Ok</Text></TouchableOpacity>
            :<TouchableOpacity onPress={this.onLogOutSubmit} style={ConfirmButton} ><Text style={{color:"white"}}>Ok</Text></TouchableOpacity>  
            }
            </Dialog.Actions>
             </Dialog>
            </Portal>
            </View>
            
            <BottomBar navigation={this.props.navigation} />
            </>
        );
    }
}





// axios.post(BASE_URL+"users/logOut",body,{
        //     headers: {
        //     //  'Content-Type': 'application/json',
        //      'x-access-token': this.state.userToken,
        //   }
        // }).then(response => {
        //         if(response.data.isSuccess==true){
        //           if(response.data.message!=null){
        //             alert(response.data.message);
        //             this.props.navigation.navigate("Login")
        //           }
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.response);
        //         if(error.response){
        //         alert(error.response.data.error);
        //         this.setState({ dialogVisible: false});
        //    }
        // });

        // if(!this.state.oldPassword||!this.state.password||!this.state.confirmPassword){
        //    alert('All fields are required') 
        // }else if(this.state.password!=this.state.confirmPassword){
        //     alert('New password and confirm password should be same.') 
        // }else{
        //     let body={
        //         password:this.state.oldPassword,
        //         newPassword:this.state.password
        //       }
        //       axios.post(BASE_URL+"users/changePassword",body,{
        //           headers: {
        //            'Content-Type': 'application/json',
        //            'x-access-token': this.state.userToken,
        //         }
        //       }).then(response => {
        //               if(response.data.isSuccess==true){
        //                 if(response.data.data!=null){
        //                   alert(response.data.data);
        //                   this.setState({ dialogVisible: false});
        //                 }
        //               }
        //           })
        //           .catch(error => {
        //               console.log(error.response);
        //               if(error.response){
        //               alert(error.response.data.error);
        //               this.setState({ dialogVisible: false});
        //          }
        //       });
        // }
