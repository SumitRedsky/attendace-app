import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import styles from './styles';
import BottomBar from '../BottomBar';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Dimensions
} from 'react-native';
import * as colors from "../../constants/colors";
import {BASE_URL} from '../../constants/api';
import * as commanApi from "../../store/commanApi";
import AsyncStorage from '@react-native-community/async-storage';

export default class AttendanceDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
        customDatesStyles:[] ,
        today:'',
        query:'',
        userId:'',
        userToken:'',
        weekEnds:'',
        workingDays:''
    }
  }
  componentDidMount=async()=>{
    const token= await AsyncStorage.getItem('userToken');
    const userId=await AsyncStorage.getItem('userId');
    let now=moment();
    let totalDays=moment().daysInMonth();
    let totalWeekEnds=await this.getWeekEndsInMonth(now, 0);
    let workingDays=totalDays-totalWeekEnds;
    await this.setState({query:`type=monthly&&userId=${userId}`,userId:userId,userToken:token,weekEnds:totalWeekEnds,workingDays:workingDays});
    this.getMonthlyAttendance(this.state.query);
  }
  getWeekEndsInMonth=async(date, weekday)=>{
    date.date(1);
    var dif = (7 + (weekday - date.weekday())) % 7 + 1;
    return Math.floor((date.daysInMonth() - dif) / 7) + 1;
  }
  getMonthlyAttendance=async(query)=>{
    try {
      this.setState({isVisibleLoading:true});
      let response = commanApi.getDataApi(BASE_URL+`punches?${query}`, this.state.userToken)
      response.then(res => {
          if (res.data && res.data.length!=0) {
            let customDatesStyles=[]
            for(let item of res.data){
              if(item){
                  let date=moment(item.date, 'DD-MM-YYYY');
                  let backgroundColor
                  if(item.status=='present'){
                      backgroundColor='green'
                  }
                  if(item.status=='absent'){
                      backgroundColor='red'
                  }
                  if(item.status=='leave'){
                      backgroundColor='orange'
                  }
                  customDatesStyles.push({
                      date: date,
                      style: {
                        backgroundColor:backgroundColor
                      },
                      textStyle: {color: 'white'},
                      containerStyle: [],
                  });
              }
           }
           let currentday = moment();
           this.setState({today:currentday,customDatesStyles:customDatesStyles});
          }
          else {
            console.log("data:",res.data);
          }
      }).catch(error => {
          alert("Something went wrong",error)
      })
   }
   catch (err) {
    alert(err)
   }
  }
  onMonthChange=async(date)=>{
    let totalDays=date.daysInMonth();
    let totalWeekEnds=await this.getWeekEndsInMonth(date, 0);
    let workingDays=totalDays-totalWeekEnds;
    
    let month=moment(date).format('MM-YYYY');
    
    await this.setState({query:`type=monthly&&userId=${this.state.userId}&&month=${month}`,weekEnds:totalWeekEnds,workingDays:workingDays});
    this.getMonthlyAttendance(this.state.query);
  }

  render() {
    const {
      Holidays,
      LeavesDays,
      AbsentDays,
      PresentDays,
      WorkingDays,
      CalenderContainer,
      ContentRow,
      Heading,
      ContentColumn,
      CardStyle
    } = styles;
    return (
      <>
        <Text style={Heading}>Attendance Details</Text>
        <View style={CalenderContainer}>
          <CalendarPicker
            customDatesStyles={this.state.customDatesStyles}
            minDate={this.state.today}
            onDateChange={this.onDateChange}
            onMonthChange={this.onMonthChange}
          />
        </View>

          <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
           <Card style={[CardStyle,{backgroundColor:colors.primaryColor}]}>
           <Card.Content>
            <View style={ContentColumn}>
            <Icon name='smile-beam' size={24} style={{color:'white'}}/>
            <Text style={[WorkingDays,{color:'white'}]}>Working days</Text>
            <Text style={[WorkingDays,{color:'white'}]}>{this.state.workingDays}</Text>
          </View>
          </Card.Content>
          </Card>
          
          <View style={{flexDirection:'row'}}>
          <Card style={[CardStyle,{width: Dimensions.get('window').width-218,backgroundColor:'#097FEB'}]}>
           <Card.Content>
          <View style={ContentColumn}>
            <Icon name='grin-alt' size={24} style={{color:'white'}} />
            <Text style={[WorkingDays,{color:'white'}]}>Weekends</Text>
            <Text style={[WorkingDays,{color:'white'}]}>{this.state.weekEnds}</Text>
          </View>
          </Card.Content>
          </Card>
          <Card style={[CardStyle,{width: Dimensions.get('window').width-218}]}>
           <Card.Content>
          <View style={ContentColumn}>
            <Icon name='grin-stars' size={24} style={{color:'white'}} />
            <Text style={[WorkingDays,{color:'white'}]}>Holidays</Text>
            <Text style={[WorkingDays,{color:'white'}]}>25</Text>
          </View>
          </Card.Content>
          </Card>
          </View>

          <View style={{flexDirection:'row'}}>
          <Card style={[CardStyle,{width: Dimensions.get('window').width-247,backgroundColor:'green'}]}>
           <Card.Content>
          <View style={ContentColumn}>
            <Icon name='smile' size={24} style={{color:'white'}} />
            <Text style={[WorkingDays,{color:'white'}]}>Present</Text>
            <Text style={[WorkingDays,{color:'white'}]}>25</Text>
          </View>
          </Card.Content>
          </Card>
          <Card style={[CardStyle,{width: Dimensions.get('window').width-247,backgroundColor:'red'}]}>
           <Card.Content>
          <View style={ContentColumn}>
            <Icon name='frown' size={24} style={{color:'white'}} />
            <Text style={[WorkingDays,{color:'white'}]}>Absent</Text>
            <Text style={[WorkingDays,{color:'white'}]}>25</Text>
          </View>
          </Card.Content>
          </Card>
          <Card style={[CardStyle,{width: Dimensions.get('window').width-247,backgroundColor:'orange'}]}>
           <Card.Content>
          <View style={ContentColumn}>
            <Icon name='meh' size={24} style={{color:'white'}} />
            <Text style={[WorkingDays,{color:'white'}]}>Leave</Text>
            <Text style={[WorkingDays,{color:'white'}]}>25</Text>
          </View>
          </Card.Content>
          </Card>
          </View>

          
          </View>
          
          
          {/* <View style={ContentRow}>
            <Text style={WorkingDays}>Total working days: 25</Text>
            <Text style={Holidays}>Weeekend: 5</Text>
          </View> */}

          {/* <View style={ContentRow}>
            <Text style={Holidays}>Weeekend: 5</Text>
            <Text style={WorkingDays}>Holidays: 4</Text>
          </View>

          <View style={ContentRow}>
            <Text style={PresentDays}>Present: 25</Text>
            <Text style={AbsentDays}>Absent: 5</Text>
          </View>

          <View style={ContentRow}>
            <Text style={LeavesDays}>Leaves: 2</Text>
          </View> */}

        {/* </View> */}

        <BottomBar navigation={this.props.navigation} />
      </>
    );
  }
}



















//   let newCustomDates=[]
  //   if(month=='05-2020'){
  //     newCustomDates = [{
  //       date:'01-05-2020',
  //       status:'present'
  //   },{
  //       date:'02-05-2020',
  //       status:'present'
  //   },{
  //       date:'03-05-2020',
  //       status:'weekEnd'
  //   },{
  //     date:'04-05-2020',
  //     status:'present'
  // },{
  //     date:'05-05-2020',
  //     status:'absent'
  // },{
  //     date:'06-05-2020',
  //     status:'present'
  // },{
  //   date:'07-05-2020',
  //   status:'present'
  // },{
  //   date:'08-05-2020',
  //   status:'absent'
  // },{
  //   date:'09-05-2020',
  //   status:'leave'
  // }];
  //   }
  //   if(month=='06-2020'){
  //     newCustomDates = [{
  //       date:'01-06-2020',
  //       status:'present'
  //   },{
  //       date:'02-06-2020',
  //       status:'present'
  //   },{
  //       date:'03-06-2020',
  //       status:'weekEnd'
  //   },{
  //     date:'04-06-2020',
  //     status:'present'
  // },{
  //     date:'05-06-2020',
  //     status:'absent'
  // },{
  //     date:'06-06-2020',
  //     status:'present'
  // },{
  //   date:'07-06-2020',
  //   status:'present'
  // },{
  //   date:'08-06-2020',
  //   status:'absent'
  // },{
  //   date:'09-06-2020',
  //   status:'leave'
  // }];
  //   }
  //   let customDatesStyles=[]
  //   for(let item of newCustomDates){
  //     if(item){
  //         let today=moment(item.date, 'DD-MM-YYYY');
  //         let backgroundColor
  //         if(item.status=='present'){
  //             backgroundColor='green'
  //         }
  //         if(item.status=='absent'){
  //             backgroundColor='red'
  //         }
  //         if(item.status=='leave'){
  //             backgroundColor='orange'
  //         }
  //         if(item.status=='weekEnd'){
  //           backgroundColor='#097FEB'
  //       }
  //         customDatesStyles.push({
  //             date: today,
  //             // Random colors
  //             style: {
  //               backgroundColor:backgroundColor
  //             },
  //             textStyle: {color: 'white'},
  //             containerStyle: [],
  //         });
  //     }
  // }
  // let currentday = moment();
  // await this.setState({today:currentday,customDatesStyles:customDatesStyles});
  // console.log('customDatesStyles:',this.state.customDatesStyles)
  // console.log("month::::::::::",month)


















// let newCustomDates = [{
    //     date:'02-04-2020',
    //     status:'present'
    // },{
    //     date:'03-04-2020',
    //     status:'absent'
    // },{
    //     date:'04-04-2020',
    //     status:'leave'
    // }];
    // let customDatesStyles=[]
    // for(let item of newCustomDates){
    //     if(item){
    //         let today=moment(item.date, 'DD-MM-YYYY');
    //         let backgroundColor
    //         if(item.status=='present'){
    //             backgroundColor='green'
    //         }
    //         if(item.status=='absent'){
    //             backgroundColor='red'
    //         }
    //         if(item.status=='leave'){
    //             backgroundColor='orange'
    //         }
    //         customDatesStyles.push({
    //             date: today,
    //             // Random colors
    //             style: {
    //               backgroundColor:backgroundColor
    //             },
    //             textStyle: {color: 'white'},
    //             containerStyle: [],
    //         });
    //     }
    // }
    // let currentday = moment();
    // await this.setState({today:currentday,customDatesStyles:customDatesStyles});
    // console.log('customDatesStyles:',this.state.customDatesStyles)