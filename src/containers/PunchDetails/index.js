import React, { Component } from 'react';
import {TouchableOpacity,ScrollView, Text,View } from "react-native";
import styles from './styles';
import BottomBar from "../BottomBar";
import Accordian from "../../shared/Accordian";
import {BASE_URL} from '../../constants/api';
import * as commanApi from "../../store/commanApi";
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export default class PunchDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            userToken:'',
            userId:'',
            isToday:true,
            isWeek:false,
            isMonthly:false,
            pickerOpen:false,
            query:'',
            shortage:'',
            punchDetails:[],
            weeklyPunchDetails:[],
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
    componentDidMount= async()=> {
        const token= await AsyncStorage.getItem('userToken');
        const userId=await AsyncStorage.getItem('userId');
        this.setState({userToken: token,userId: userId});
        this.getAttendance('today');
    }
    getAttendance = async(params)=>{
        console.log('paramsssss:',params)
        let type
        switch(params) {
            case 'today':
            type='today'
            break;
            case 'currentWeek':
            type='currentWeek'
            break;
            case 'monthly':
            type='monthly'
            break;
            default:
              alert("type not found");
              break;
            }
            try {
                let response = commanApi.getDataApi(BASE_URL+`punches?type=${type}&&userId=${this.state.userId}`, this.state.userToken)
                response.then(res => {
                    if (res.data&&res.data.length!=0) {
                        switch(type) {
                            case 'today':
                              let todayAttendance=res.data[0]
                              if(todayAttendance){
                                  if(todayAttendance.punches && (todayAttendance.punches.length!=0)){
                                      this.setState({
                                        punchDetails :todayAttendance.punches 
                                      })
                                  }
                                this.setState({shortage:todayAttendance.shortage})
                              }
                              break;
                            case 'currentWeek':
                            let currentWeekAttendances=res.data;
                            if(currentWeekAttendances){
                             this.setState({
                                weeklyPunchDetails:currentWeekAttendances
                             })
                            }
                            break;
                            case 'monthly':
                            alert('type=monthly')
                              break;
                            default:
                              alert("no type not found");
                              break;
                            }  
                    }else {
                      console.log("data:",res.data);
                      switch(this.state.query) {
                        case 'type=today':
                        alert('no today attendance found');
                          break;
                        case 'type=currentWeek':
                        alert('no currentWeek attendance found');
                          break;
                        case 'type=monthly':
                        alert('no monthly attendance found');
                          break;
                        default:
                          alert("no type not found");
                          break;
                        } 
                    }
                }).catch(error => {
                    alert("Something went wrong",error)
                    console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:',error)
                })
             }
             catch (err) {
              alert(err)
             }
    }
    onToday=()=>{
      this.getAttendance('today');
      this.setState({isToday:true,isWeek:false,isMonthly:false});
    }
    onWeek=()=>{
        this.getAttendance('currentWeek');
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
                    id={item._id}
                    from= 'punchDetails'
                    day = {item.day}
                    date={item.date}
                    totalWorkedHours={item.totalWorkedHours}
                    data = {item.punches}
                    shortage={item.shortage}
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
                id={item._id}
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
      const {UnselectedButton,SelectedButton,WeeklyPunchDetail,Heading,Selectors,Buttons,ClickedButtons,Container,PuchDetail,TextStyle} = styles
        return (
            <>
            <Text style={Heading}>Punch details</Text>

            <View style={Selectors}>
            <TouchableOpacity style={this.state.isToday ? ClickedButtons:Buttons} onPress={this.onToday}>
                <Text style={this.state.isToday? UnselectedButton: SelectedButton}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.isWeek ? [ClickedButtons,{width:98}] : [Buttons,{width:98}]} onPress={this.onWeek}>
                <Text style={this.state.isWeek ? UnselectedButton : SelectedButton}>Current week</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={this.state.isMonthly ? ClickedButtons : Buttons} onPress={this.onMonth}>
                <Text style={this.state.isMonthly ? UnselectedButton : SelectedButton}>Monthly</Text>
            </TouchableOpacity> */}
           
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
                <View key={item._id} style={[Selectors,PuchDetail,{marginTop:15}]}>
                  <Text>{item.punchIn}</Text>
                  <Text>{item.punchOut}</Text>
                </View>
                )
            })}

            <View style={[Selectors,PuchDetail]}>
            <Text style={TextStyle}>Total working hours:</Text>
            <Text style={[TextStyle,{color:'green'}]}>9 hours</Text>
            </View>

            <View style={[Selectors,PuchDetail,{marginTop:15}]}>
            <Text style={TextStyle}>Shortage:</Text>
            <Text style={[TextStyle,{color:'red'}]}>{this.state.shortage}</Text>
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







//    for(let item of todayAttendance.punches){
                                //        if(item){
                                //         var joined =this.state.punchDetails.concat({
                                //             id:item._id,
                                //             punchIn:item.punchIn,
                                //             punchOut:item.punchOut 
                                //          })
                                //          this.setState({ punchDetails: joined })
                                //        } 
                                //    }
                                // for(let dayItem of currentWeekAttendances){
                            //   if(dayItem){
                            //       if(dayItem.punches&&(dayItem.punches.length!=0)){
                            //           for(let item of dayItem.punches){
                            //               if(item){
                            //                   data.push({
                            //                     id:item._id,
                            //                     punchIn:item.punchIn,
                            //                     punchOut:item.punchOut  
                            //                   })
                            //               }
                            //           }
                            //       }
                            //       console.log('punchdatdata:',data)
                            //       let day=moment(dayItem.date).format('d')
                            //       var joined =this.state.weeklyPunchDetails.concat({
                            //         id: dayItem._id, 
                            //         day:day,
                            //         date:dayItem.date,
                            //         totalWorkedHours:'8 hours',
                            //         data:data
                            //      })
                            //      data=[];
                            //      this.setState({ weeklyPunchDetails: joined }) 
                            //   }
                            // }