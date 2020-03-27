import React, { Component } from 'react';
import {TextInput,Label, Text,View,Image,ScrollView,TouchableOpacity } from "react-native";
import styles from './ProfileStyles'
import BottomBar from "../BottomBar/BottomBar";
import Accordian from "../../shared/Accordian/Accordian";
import {loginService} from '../../services/login.service';
import {Paragraph, Dialog, Portal } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {apiConfig} from '../../config/config'

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
    componentDidMount() {
        AsyncStorage.getItem('userToken').then((userToken) => {
            if(userToken){
                this.setState({userToken: userToken});
            }
        });
    }
    
    changePassword=()=>{
    this.setState({isChangePassword:true,dialogVisible:true})
    }

    onChangePasswordSubmit=()=>{
        if(!this.state.oldPassword||!this.state.password||!this.state.confirmPassword){
           alert('All fields are required') 
        }else if(this.state.password!=this.state.confirmPassword){
            alert('New password and confirm password should be same.') 
        }else{
            let body={
                password:this.state.oldPassword,
                newPassword:this.state.password
              }
              axios.post(apiConfig.baseUrl+"users/changePassword",body,{
                  headers: {
                   'Content-Type': 'application/json',
                   'x-access-token': this.state.userToken,
                }
              }).then(response => {
                      if(response.data.isSuccess==true){
                        if(response.data.data!=null){
                          alert(response.data.data);
                          this.setState({ dialogVisible: false});
                        }
                      }
                  })
                  .catch(error => {
                      console.log(error.response);
                      if(error.response){
                      alert(error.response.data.error);
                      this.setState({ dialogVisible: false});
                 }
              });
        }

    }

    logOut=()=>{
        this.setState({isChangePassword:false,dialogVisible:true})
    }
    onLogOutSubmit=()=>{
        let body={}
        axios.post(apiConfig.baseUrl+"users/logOut",body,{
            headers: {
            //  'Content-Type': 'application/json',
             'x-access-token': this.state.userToken,
          }
        }).then(response => {
                if(response.data.isSuccess==true){
                  if(response.data.message!=null){
                    alert(response.data.message);
                    this.props.navigation.navigate("Login")
                  }
                }
            })
            .catch(error => {
                console.log(error.response);
                if(error.response){
                alert(error.response.data.error);
                this.setState({ dialogVisible: false});
           }
        }); 
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
            <Image style={Profile} source={require('../../images/user.png')}/>
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
