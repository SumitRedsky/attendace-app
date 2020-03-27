import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import BottomBar from "./containers/BottomBar/BottomBar";
import Profile from "./containers/Profile/Profile";
import PunchDetails from "./containers/PunchDetails/PunchDetails";
// import SideDrawer from "./containers/SideDrawer/SideDrawer";
import Accordian from './shared/Accordian/Accordian';
import AttendanceDetails from './containers/AttendanceDetails/AttendanceDetails';
import DialogBox from './shared/DialogBox/DialogBox';

const Stack = createStackNavigator();

function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}  >
          <Stack.Screen name="Login" component={Login} /> 
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PunchDetails" component={PunchDetails} />
          <Stack.Screen name="AttendanceDetails" component={AttendanceDetails} />
          <Stack.Screen name="Accordian" component={Accordian} />
          <Stack.Screen name="DialogBox" component={DialogBox} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
export default AppNavigation;

// screenOptions={{
//     headerShown: false
//   }}