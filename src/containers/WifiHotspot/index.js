// import React, { Component } from 'react';
// import { Text,View } from "react-native";
// // import styles from './styles';
// import Hotspot from "react-native-wifi-hotspot";

// export default class WifiHotspot extends Component {
//     constructor(props) {
//         super(props);
//     }
//     doEnable = () => {
//         // console.warn("do Enable called");
//         Hotspot.enable(
//           () => {
//             ToastAndroid.show("Hotspot Enable", ToastAndroid.SHORT);
//           },
//           err => {
//             ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
//           }
//         );
//       };
//       doDisable = () => {
//         Hotspot.disable(
//           () => {
//             ToastAndroid.show("Hotspot Disabled", ToastAndroid.SHORT);
//           },
//           err => {
//             ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
//           }
//         );
//       };
//     render() {
//         const {}=styles
//         return (
//             <>
//            <TouchableOpacity onPress={this.doEnable} style={{backgroundColor:'blue',padding:10}}>
//             <Text style={LoginText}>hotspot on</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.doDisable} style={{backgroundColor:'blue',padding:10}}>
//             <Text style={LoginText}>hotspot of</Text>
//             </TouchableOpacity>
//             </>
//         );
//     }
// }
