import React, { Component } from "react";
import { View, Image} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

export default class Splash extends Component {
    constructor(props) {
        super(props);
      }
 componentDidMount = async() =>{
    this.timeoutHandle = setTimeout(() => {
        this.retrieveData()
    }, 2000);
  }
  retrieveData=async()=>{
    let userToken=await AsyncStorage.getItem('userToken');
    if(userToken!=null && userToken!=undefined && userToken!=""){
        this.props.navigation.navigate("Home");
    }else{
        this.props.navigation.navigate("Login");
    }
  }
  render() {
    const {SplashContainer ,Logo}=styles
    return (
      <View style={SplashContainer}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/app-icon.png')} style={Logo} />
          </View>
      </View>
    );
  }
}
