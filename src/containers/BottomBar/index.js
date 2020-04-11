import React, { Component } from 'react';  
import { Text, View,TouchableOpacity} from 'react-native';    
import Icon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import styles from './styles';

var isHome=true;
var isPunchDetails=false;
var isProfile=false;
var isLeave=false;
export default class BottomBar extends Component {
    constructor(props) {
        super(props);
    }
    showHome=()=>{
        if(this.props){
            isHome=true;
            isPunchDetails=false;
            isProfile=false;
            isLeave=false;
            this.props.navigation.navigate("Home")
        }
    }
    showPunchDetails=()=>{
        if(this.props){
            isHome=false;
            isPunchDetails=true;
            isProfile=false;
            isLeave=false;
            this.props.navigation.navigate("PunchDetails")
        } 
    }
    showLeaves=()=>{
        if(this.props){
            isHome=false;
            isPunchDetails=false;
            isProfile=false;
            isLeave=true;
            this.props.navigation.navigate("AttendanceDetails")
        }   
    }
    showProfile=()=>{
        if(this.props){
            isHome=false;
            isPunchDetails=false;
            isProfile=true;
            isLeave=false;
            this.props.navigation.navigate("Profile")
        }
    }
    render() {
     const {Container,Icons,BottomBarContent,ClickedIcon,BeforeClickedText,ClickedText} = styles
        return (
            <View style={Container} >
            <TouchableOpacity onPress={this.showHome} style={BottomBarContent} >
            <View style={isHome?ClickedIcon:Icons}><Icon name="home" size={25} color={isHome?"white":"#4A5D6B"}/></View>
            <Text style={isHome?ClickedText:BeforeClickedText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.showPunchDetails} style={BottomBarContent} >            
            <View style={isPunchDetails?ClickedIcon:Icons}><FoundationIcon  name="clipboard-notes" size={25} color={isPunchDetails?"white":"#4A5D6B"}/></View>
            <Text style={isPunchDetails?ClickedText:BeforeClickedText}>Punch Details</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.showLeaves} style={BottomBarContent} >            
            <View style={isLeave?ClickedIcon:Icons}><FoundationIcon name="clipboard-pencil" size={25} color={isLeave?"white":"#4A5D6B"}/></View>
            <Text style={isLeave?ClickedText:BeforeClickedText}>Attendance Details</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.showProfile} style={BottomBarContent} >            
            <View style={isProfile?ClickedIcon:Icons}><Icon name="user" size={25} color={isProfile?"white":"#4A5D6B"}/></View>
            <Text style={isProfile?ClickedText:BeforeClickedText}>Profile</Text>
            </TouchableOpacity>

            </View>
        );
    }
}

