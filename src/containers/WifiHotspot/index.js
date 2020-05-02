import React, { Component } from 'react';
import { Text,View,TouchableOpacity ,ToastAndroid,Switch} from "react-native";
// import styles from './styles';
import Hotspot from "react-native-wifi-hotspot";

export default class WifiHotspot extends Component {
    constructor(props) {
        super(props);
        this.state={
            server:true
        }
    }
    doEnable = () => {	                      
        Hotspot.enable(
          () => {
            ToastAndroid.show("Hotspot Enable", ToastAndroid.SHORT);
            console.log("Enable:","Hotspot Enabled")
          },
          err => {
            ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
            console.log("enable error:",err.toString())
          }
        );
      };
      doDisable = () => {
        Hotspot.disable(
          () => {
            ToastAndroid.show("Hotspot Disabled", ToastAndroid.SHORT);
            console.log("disable:","Hotspot Disabled");
          },
          err => {
            ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
            console.log("disable error:",err.toString());
          }
        );
      };
      
    render() {
        return (
            <>
           <TouchableOpacity onPress={this.doEnable} style={{backgroundColor:'blue',padding:10}}>
            <Text style={{backgroundColor:'red',padding:10}}>hotspot on</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.doDisable} style={{backgroundColor:'blue',padding:10}}>
            <Text style={{backgroundColor:'red',padding:10}}>hotspot of</Text>
            </TouchableOpacity>
            </>
        );
    }
}
