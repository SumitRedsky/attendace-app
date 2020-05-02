import React, {Component} from 'react';
import {Text, View,Image,ScrollView,TextInput} from 'react-native';
import styles from './styles';
import MainHeader from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
// import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state={
        userId:'',
        userToken:''
  }

}
componentDidMount=async()=>{
        const token= await AsyncStorage.getItem('userToken');
        const userId=await AsyncStorage.getItem('userId');
        await this.setState({userId:userId,userToken:token});
}
  render() {
    const {Container,contain,ChatMessages,OwnMessage,FromMessage,MessageTimingStyle,SelfMessages,FieldContainer,InputFieldStyle,IconContainer} = styles;
    return (
      <>
      <MainHeader from='messages'/>
      
        <View style={Container}>
        <ScrollView >
        <View style={ChatMessages}>
            <Text style={FromMessage}>Badges are small components typically used to communicate.</Text>
        </View>
        {/* <View style={contain} >
        <Text style={MessageTimingStyle}>02:30 pm</Text>
        </View> */}

        <View style={[ChatMessages,SelfMessages]}>
            <Text style={OwnMessage}>Badges are </Text>
        </View>
        {/* <View style={[contain]}>
        <Text style={MessageTimingStyle}>02:30 pm</Text>
        </View> */}

        <View style={ChatMessages}>
            <Text >Badges are small </Text>
        </View>
        <View style={[ChatMessages,SelfMessages]}>
            <Text style={{color:'white'}}>small components typically used to communicate </Text>
        </View>
        <View style={ChatMessages}>
            <Text >typically used to communicate </Text>
        </View>
        <View style={[ChatMessages,SelfMessages]}>
            <Text style={{color:'white'}}>small components typically used to communicate </Text>
        </View>
        <View style={[ChatMessages,SelfMessages]}>
            <Text style={{color:'white'}}> typically used to communicate </Text>
        </View>
        </ScrollView>
        </View>
        <View style={FieldContainer}>
        <TextInput  multiline={true} placeholder="Type a message....." style={InputFieldStyle}/>
        <View style={IconContainer}>
        <Icon name="paper-plane" style={{color:'white',fontSize:20}}></Icon>
        </View>
        </View>
      </>
    );
  }
}




