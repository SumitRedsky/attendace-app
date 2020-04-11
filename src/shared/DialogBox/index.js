import React, { Component } from 'react';
import {Text,Button, View,TouchableOpacity } from "react-native";
import styles from './styles';
import {Paragraph, Dialog, Portal } from 'react-native-paper';
import {loginService} from '../../services/login.service';


export default class DialogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true,
            open: false
        };
    }
    // componentDidMount() {
    //     this.subscription = loginService.getShowDialogs().subscribe(state=>{
    //       if(state==true){
    //           console.log('stete:',state)
    //         this.setState({ dialogVisible: true });
    //       }
    //     })
    // }
    // componentWillUnmount() {
    //     this.subscription.unsubscribe();
    //   }
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    
    closeDialog=()=>{
        this.setState({ dialogVisible: false});  
    }
    render() {
        const {DialogBox,ConfirmButton} = styles
        return (
            <>
            <View>
             <Portal>
            <Dialog visible={this.state.dialogVisible} onDismiss={this.closeDialog} style={DialogBox}>
            <Dialog.Content>
              <Paragraph style={{fontSize:16,marginTop:10}}> vvhmvhvhlgbuhbujhujhujhuihui</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
            <TouchableOpacity style={ConfirmButton} ><Text style={{color:"white"}}>Ok</Text></TouchableOpacity>
            </Dialog.Actions>
             </Dialog>
            </Portal>
            </View>
            </>
        );
    }
}















