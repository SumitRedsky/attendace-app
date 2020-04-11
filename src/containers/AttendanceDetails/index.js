import React, { Component } from 'react';
import { Text,View } from "react-native";
import styles from './styles';
import BottomBar from "../BottomBar";
import CalendarPicker from 'react-native-calendar-picker';

export default class AttendanceDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {Holidays,LeavesDays,AbsentDays,PresentDays,WorkingDays,CalenderContainer,ContentRow,Heading}=styles
        return (
            <>
            <Text style={Heading}>Attendance Details</Text>
            <View style={CalenderContainer}>
            <CalendarPicker
             onDateChange={this.onDateChange}/>

             <View style={ContentRow}>
             <Text style={WorkingDays}>Total working days:  25</Text>
             <Text style={Holidays}>Total holidays: 5</Text>
             </View>

             <View style={ContentRow}>
             <Text style={PresentDays}>Present:  25</Text>
             <Text style={AbsentDays}>Absent: 5</Text>
             </View>

             <View style={ContentRow}>
             <Text style={LeavesDays}>Leaves:  2</Text>
             </View>
            
            </View>
           
            <BottomBar navigation={this.props.navigation} />
            </>
        );
    }
}
