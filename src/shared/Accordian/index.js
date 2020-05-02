import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from "react-native";
import styles from './styles';
import Icon from "react-native-vector-icons/MaterialIcons";
import {loginService} from '../../services/login.service';

export default class Accordian extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
          isSunday:false
        }
    }
    componentDidMount() {
        this.subscription = loginService.getExpanded().subscribe(state=>{
          if(state==true){
            this.setState({expanded:false});
          }
        })
        if(this.props.day=='Sunday'){
          this.setState({isSunday:true});
        }else{
          this.setState({isSunday:false});
        }
    }
    componentWillUnmount() {
        this.subscription.unsubscribe();
      }
    toggleExpand=()=>{
        loginService.expended(true);
        this.setState({expanded : !this.state.expanded})
    }

  render() {
      const{Title,Row,InternalRow,ParentHr,Child,Selectors,PuchDetail,TextStyle}=styles
      if(this.props.from =='profile'){
          from=(
            <View>
            <TouchableOpacity style={Row} onPress={()=>this.toggleExpand()}>
            <Text style={Title}>{this.props.title}</Text>
            <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} style={{color:'white'}} />
            </TouchableOpacity>
            <View style={ParentHr}/>
            {
                this.state.expanded &&
                <View style={Child}>
                    <Text>{this.props.data}</Text>    
                </View>
            }
          </View>
          )
      }else if(this.props.from =='punchDetails'){
          from=(
            <View>
            <TouchableOpacity style={Row} onPress={()=>this.toggleExpand()}>
            <View style={{flexDirection:'column'}}>
            <Text style={Title}>{this.props.day}  ({this.props.date})</Text>
            <Text style={{color:'white',top:2,bottom:2}}>Total working hours:  {this.props.totalWorkedHours}</Text>
            </View>
            <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} style={{color:'white'}} />
            </TouchableOpacity>
            <View style={ParentHr}/>
               {
                this.state.expanded &&
                <View style={Child}>

                <View style={[Selectors,PuchDetail]}>
                <Text style={TextStyle}>Check-in</Text>
                <Text style={TextStyle}>Check-out</Text>
                </View>
                {this.props.data.map((item)=>{
                return(
                <View key={item._id} style={[Selectors,PuchDetail,{marginTop:15}]}>
                  <Text >{item.punchIn}</Text>
                  <Text >{item.punchOut}</Text>
                </View>
                )
            })}

            <View style={[Selectors,PuchDetail]}>
            <Text style={TextStyle}>Total working hours:</Text>
            <Text style={[TextStyle,{color:'green'}]}>9 hours</Text>
            </View>
            
            <View style={[Selectors,PuchDetail,,{marginTop:15}]}>
            <Text style={TextStyle}>Shortage:</Text>
            <Text style={[TextStyle,{color:'red'}]}>{this.props.shortage}</Text>
            </View>
            </View>
            }
          </View>
          )
      }else{
        from=(
           <View>
            <TouchableOpacity style={this.state.isSunday ? [Row,{backgroundColor:'green'}] : this.props.isHoliday ? [Row,{backgroundColor:'green'}]:this.props.onLeave?[Row,{backgroundColor:'orange'}]:this.props.isAbsent?[Row,{backgroundColor:'red'}]: Row}>
            <View style={{flexDirection:'column'}}>
            <View style={InternalRow}>
            <Text style={Title}>{this.props.date}</Text>
            <Text style={Title}>({this.props.day})</Text>
            </View>
            <Text style={{color:'white',bottom:2}}>{this.state.isSunday? 'Week-off':this.props.isHoliday ?'Holiday':this.props.onLeave?'On leave':this.props.isAbsent?'Absent':`Total working hours:${this.props.totalWorkedHours}`}</Text>
            </View>
            </TouchableOpacity>
          </View>

        )
      }
    return from
  }

  

}

