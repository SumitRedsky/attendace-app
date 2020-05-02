import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../containers/Home";
import Login from "../containers/Login";
import BottomBar from "../containers/BottomBar";
import Profile from "../containers/Profile";
import PunchDetails from "../containers/PunchDetails";
import Accordian from '../shared/Accordian';
import AttendanceDetails from '../containers/AttendanceDetails';
import DialogBox from '../shared/DialogBox';
import Splash from '../containers/Splash';
import WifiHotspot from '../containers/WifiHotspot';
import Chat from '../containers/Chat';
import MainHeader from '../components/Header';
import Messages from '../containers/Messages';

const Stack = createStackNavigator();

function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}  >
        {/* <Stack.Screen name="WifiHotspot" component={WifiHotspot} />  */}
          <Stack.Screen name="Splash" component={Splash} /> 
          <Stack.Screen name="Login" component={Login} /> 
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PunchDetails" component={PunchDetails} />
          <Stack.Screen name="AttendanceDetails" component={AttendanceDetails} />
          <Stack.Screen name="Accordian" component={Accordian} />
          <Stack.Screen name="DialogBox" component={DialogBox} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="MainHeader" component={MainHeader} />
          <Stack.Screen name="Messages" component={Messages} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
export default AppNavigation;

// screenOptions={{
//     headerShown: false
//   }}