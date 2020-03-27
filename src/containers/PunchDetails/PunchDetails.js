import React, { Component } from 'react';
import {TouchableOpacity,ScrollView, Text,View } from "react-native";
import styles from './PunchDetailsStyles';
import BottomBar from "../BottomBar/BottomBar";
import Accordian from "../../shared/Accordian/Accordian";


export default class PunchDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            isToday:true,
            isWeek:false,
            isMonthly:false,
            pickerOpen:false,
            punchDetails:[{
                checkIn:'09:00:00',
                checkOut:'11:00:02'
            },
            {
                checkIn:'12:00:00',
                checkOut:'01:00:02'
            },
            {
                checkIn:'02:00:00',
                checkOut:'05:00:02'
            },
            {
                checkIn:'05:10:00',
                checkOut:'07:00:02'
            }],
            weeklyPunchDetails:[{
                day:'Monday',
                date:'09/12/2020',
                totalWorkedHours:'8 hours',
                data:[{
                    checkIn:'09:00:00',
                    checkOut:'11:00:02'  
                },{
                    checkIn:'12:00:00',
                    checkOut:'01:00:02'
                }]
            },{
                day:'Tuesday',
                date:'10/12/2020',
                totalWorkedHours:'7 hours',
                data:[{
                    checkIn:'10:00:00',
                    checkOut:'11:00:02'  
                },{
                    checkIn:'12:00:00',
                    checkOut:'01:00:02'
                }]
            },
            {
                day:'Wednesday',
                date:'11/12/2020',
                totalWorkedHours:'8 hours',
                data:[{
                    checkIn:'10:00:00',
                    checkOut:'11:00:02'  
                },{
                    checkIn:'12:00:00',
                    checkOut:'01:00:02'
                }]
            },{
                day:'Thursday',
                date:'12/12/2020',
                totalWorkedHours:'7 hours',
                data:[{
                    checkIn:'10:00:00',
                    checkOut:'11:00:02'  
                },{
                    checkIn:'12:00:00',
                    checkOut:'01:00:02'
                }]
            },{
                day:'Friday',
                date:'13/12/2020',
                totalWorkedHours:'6 hours',
                data:[{
                    checkIn:'10:00:00',
                    checkOut:'11:00:02'  
                },{
                    checkIn:'12:00:00',
                    checkOut:'01:00:02'
                }]
            },{
                day:'Saturday',
                date:'14/12/2020',
                totalWorkedHours:'7 hours',
                data:[{
                    checkIn:'10:00:00',
                    checkOut:'11:00:02'  
                },{
                    checkIn:'12:00:00',
                    checkOut:'01:00:02'
                }]
            }
        ],
        monthlyPunchDetails:[{
            day:'Saturday',
            date:'01/12/2020',
            totalWorkedHours:'7 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Sunday',
            date:'01/12/2020',
            totalWorkedHours:'Week-off',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Monday',
            date:'02/12/2020',
            totalWorkedHours:'8 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Tuesday',
            date:'03/12/2020',
            totalWorkedHours:'9 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Wednesday',
            date:'04/12/2020',
            totalWorkedHours:'',
            onLeave:false,
            isAbsent:false,
            isHoliday:true,
        },{
            day:'Thursday',
            date:'05/12/2020',
            totalWorkedHours:'7 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Friday',
            date:'06/12/2020',
            totalWorkedHours:'',
            onLeave:true,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Saturday',
            date:'07/12/2020',
            totalWorkedHours:'7 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Sunday',
            date:'07/12/2020',
            totalWorkedHours:'Week-off',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Monday',
            date:'09/12/2020',
            totalWorkedHours:'',
            onLeave:false,
            isAbsent:true,
            isHoliday:false,
        },{
            day:'Tuesday',
            date:'10/12/2020',
            totalWorkedHours:'7 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        },{
            day:'Wednesday',
            date:'11/12/2020',
            totalWorkedHours:'4 hours',
            onLeave:false,
            isAbsent:false,
            isHoliday:false,
        }]
        }
    }
    onToday=()=>{
      this.setState({isToday:true,isWeek:false,isMonthly:false});
    }
    onWeek=()=>{
        this.setState({isToday:false,isWeek:true,isMonthly:false});
    }
    onMonth=()=>{
        this.setState({isToday:false,isWeek:false,isMonthly:true,pickerOpen: !this.state.pickerOpen})
    }
    handleChange = selectedDate => {
        this.setState({selectedDate});
    }
    
    renderAccordians=()=> {
        const items = [];
        for (let item of this.state.weeklyPunchDetails) {
            items.push(
                <Accordian 
                    from= 'punchDetails'
                    day = {item.day}
                    date={item.date}
                    totalWorkedHours={item.totalWorkedHours}
                    data = {item.data}
                />
            );
        }
        return items;
    }
    renderForMonthlyDetails=()=>{
        const values=[];
        for(let item of this.state.monthlyPunchDetails){
            values.push(
                <Accordian 
                from= 'monthlyPunchDetails'
                day = {item.day}
                date={item.date}
                totalWorkedHours={item.totalWorkedHours}
                onLeave= {item.onLeave}
                isAbsent= {item.isAbsent}
                isHoliday= {item.isHoliday}
            /> 
            )
        }
        return values;
    }
    render() {
      const {WeeklyPunchDetail,Heading,Selectors,Buttons,ClickedButtons,Container,PuchDetail,TextStyle} = styles
        return (
            <>
            <Text style={Heading}>Punch details</Text>

            <View style={Selectors}>
            <TouchableOpacity style={this.state.isToday ? ClickedButtons:Buttons} onPress={this.onToday}>
                <Text style={this.state.isToday?{color:'white'}:{color:'#DF6923'}}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.isWeek ? [ClickedButtons,{width:98}] : [Buttons,{width:98}]} onPress={this.onWeek}>
                <Text style={this.state.isWeek ? {color:'white'} : {color:'#DF6923'}}>Current week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.isMonthly ? ClickedButtons : Buttons} onPress={this.onMonth}>
                <Text style={this.state.isMonthly ? {color:'white'} : {color:'#DF6923'}}>Monthly</Text>
            </TouchableOpacity>
           
            </View>
            {/* <DatePicker open={this.state.pickerOpen} onChange={this.handleChange}/> */}
            
            {this.state.isToday ?
            <View>
            <View style={[Selectors,PuchDetail]}>
            <Text style={TextStyle}>Check-in</Text>
            <Text style={TextStyle}>Check-out</Text>
            </View>
            {this.state.punchDetails.map((item)=>{
                return(
                <View style={[Selectors,PuchDetail,{marginTop:15}]}>
                  <Text>{item.checkIn}</Text>
                  <Text>{item.checkOut}</Text>
                </View>
                )
            })}

            <View style={[Selectors,PuchDetail]}>
            <Text style={TextStyle}>Total working hours:</Text>
            <Text style={[TextStyle,{color:'green'}]}>9 hours</Text>
            </View>

            <View style={[Selectors,PuchDetail,{marginTop:15}]}>
            <Text style={TextStyle}>Shortage:</Text>
            <Text style={[TextStyle,{color:'green'}]}>45 minutes</Text>
            </View>
            </View> : this.state.isWeek ?
            <View style={WeeklyPunchDetail}>
               <ScrollView>{ this.renderAccordians() }</ScrollView>
            </View> :
            <View style={WeeklyPunchDetail}>
                {/* <Text>hjgkjgg</Text> */}
                <ScrollView>{ this.renderForMonthlyDetails() }</ScrollView>
            </View>
             } 
            <BottomBar navigation={this.props.navigation}/>
            </>
        );
    }
}






