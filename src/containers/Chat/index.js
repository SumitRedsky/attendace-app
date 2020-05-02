import React, {Component} from 'react';
import {Text, View,Image,ScrollView,TouchableOpacity} from 'react-native';
import styles from './styles';
import BottomBar from '../BottomBar';
import MainHeader from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import { Badge,withBadge } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { Divider,TouchableRipple } from 'react-native-paper';
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
  } from 'recyclerlistview';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state={
        userId:'',
        userToken:'',
        users:[{
            name:'Rahmaan',
            profile:require('../../assets/profile1.jpg')
        },{
            name:'Rohit Handa',
            profile:require('../../assets/profile2.jpeg')
        },{
            name:'Mr Mehra',
            profile:require('../../assets/profile3.jpg')
        },{
            name:'Mr Malik',
            profile:require('../../assets/profile4.jpg')
        },{
            name:'Divya',
            profile:require('../../assets/profile1.jpg')
        },{
            name:'Kuki',
            profile:require('../../assets/profile2.jpeg')
        },{
            name:'Mohan',
            profile:require('../../assets/profile3.jpg')
        },{
            name:'Gurnaam',
            profile:require('../../assets/profile4.jpg')
        },{
            name:'Ammy',
            profile:require('../../assets/profile1.jpg')
        },{
            name:'Shabir',
            profile:require('../../assets/profile2.jpeg')
        },{
            name:'Rishi',
            profile:require('../../assets/profile3.jpg')
        },{
            name:'Jennifer',
            profile:require('../../assets/profile4.jpg')
        },{
            name:'Maan',
            profile:require('../../assets/profile1.jpg')
        },{
            name:'Mohan',
            profile:require('../../assets/profile2.jpeg')
        }]
    }
  }
  componentDidMount=async()=>{
    const token= await AsyncStorage.getItem('userToken');
    const userId=await AsyncStorage.getItem('userId');
    await this.setState({userId:userId,userToken:token});
  }
 
  render() {
    const {Container,Profile,ListItem,ProfileContainer,TextStyle,TimeStyle} = styles;
    return (
      <>
      <MainHeader from="chat"/>
      
        <View style={Container}>
        <ScrollView >
        {this.state.users.map((item)=>{
                return(
                    <>
                    <TouchableRipple rippleColor="rgba(0, 0, 0, .20)" onPress={()=>{this.props.navigation.navigate('Messages')}}>
                    <View style={ListItem}>
                    <View style={ProfileContainer}>
                    <Image style={Profile} source={item.profile}/>
                    <View style={{flexDirection:'column'}}>
                    <Text style={TextStyle}>{item.name}</Text>
                    <Text>I am waiting</Text>
                    </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                    <Text style={TimeStyle}>02:30 am</Text>
                    <Badge value="1" badgeStyle={{backgroundColor:'#09D260'}} status="success" />
                    </View>
                    {/* <Divider/> */}
                    </View>
                    </TouchableRipple>
                    <Divider/>
                    </>
                  )
        })}
        </ScrollView>
        </View>
        <BottomBar navigation={this.props.navigation} />
      </>
    );
  }
}












                    {/* <LinearGradient style={{margin:4}} colors={['white', 'white', '#DF6923']} start={{ x: 0, y: 1 }} end={{ x: 0.8, y: 0 }}> */}

                    {/* </LinearGradient> */}





