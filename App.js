/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { Component }  from 'react';
import styles from './AppStyles';
import AppNavigation from './src/navigation';
// import BottomBar from './src/containers/BottomBar/BottomBar';
// import SideDrawer from "../SideDrawer/SideDrawer";

export default class App extends Component {
  constructor(props) {
    super(props);
  };
  render() {
  return (
    // <BottomBar/>
    <AppNavigation />
  );
  }
};