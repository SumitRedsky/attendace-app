import React, { Component } from 'react';  
import { Text, View,TouchableOpacity} from 'react-native';    
import Icon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import styles from './styles';

let isHome=true;
let isPunchDetails=false;
let isProfile=false;
let isLeave=false;
export default class BottomBar extends Component {
    constructor(props) {
        super(props);
        
        // this.state={
        //      isHome:true,
        //      isPunchDetails:false,
        //      isProfile:false,
        //      isLeave:false 
        // }
    }
    // componentDidMount(){
    //     this.showHome();
    // }
    showHome=()=>{
        if(this.props){
            //  this.setState({isHome:true,isPunchDetails:false,isProfile:false,isLeave:false},()=>{
            //      console.log(this.state);
            //     // this.props.navigation.navigate("Home")
            //  })
            isHome=true;
            isPunchDetails=false;
            isProfile=false;
            isLeave=false;
            this.props.navigation.navigate("Home")
        }
    }
    showPunchDetails=()=>{
        if(this.props){
            // this.setState({isHome:false,isPunchDetails:true,isProfile:false,isLeave:false},()=>{
            //     console.log(this.state);
            //     // this.props.navigation.navigate("PunchDetails")
            // })
            isHome=false;
            isPunchDetails=true;
            isProfile=false;
            isLeave=false;
            this.props.navigation.navigate("PunchDetails")
        } 
    }
    showLeaves=()=>{
        if(this.props){
            // this.setState({isHome:false,isPunchDetails:false,isProfile:false,isLeave:true},()=>{
            //     console.log(this.state);
            //     // this.props.navigation.navigate("AttendanceDetails")
            // })
            isHome=false;
            isPunchDetails=false;
            isProfile=false;
            isLeave=true;
            this.props.navigation.navigate("AttendanceDetails")
        }   
    }
    showProfile=()=>{
        if(this.props){
            // this.setState({isHome:false,isPunchDetails:false,isProfile:true,isLeave:false},()=>{
            //     console.log(this.state);
            //     // this.props.navigation.navigate("Profile")
            // })
            isHome=false;
            isPunchDetails=false;
            isProfile=true;
            isLeave=false;
            // this.props.navigation.navigate("Profile")
            this.props.navigation.navigate("Chat")

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
            {/* user          */}
            <View style={isProfile?ClickedIcon:Icons}><Icon name="comment" size={25} color={isProfile?"white":"#4A5D6B"}/></View>
            <Text style={isProfile?ClickedText:BeforeClickedText}>Chat</Text>
            </TouchableOpacity>

            </View>
        );
    }
}

