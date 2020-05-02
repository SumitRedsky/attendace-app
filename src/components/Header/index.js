import React, { Component } from "react";
import {View,Image,ImageBackground} from "react-native";
import styles from "./styles";
import { NavigationActions, StackActions } from 'react-navigation';
import { Header, Left, Right, Button, Title, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {  Paragraph, Menu, Divider, Provider } from 'react-native-paper';

export default class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'products',
            isLoginModalVisible: false,
            isAbortProcessModalVisible: false,
            fromMessages:false,
            visible: false,
            menu:[{
                item:'New group'
            },{
                item:'New chat'
            }]
        };
    }
    componentDidMount=async()=>{
        if(this.props.from=='messages'){
            await this.setState({fromMessages:true});
        }else{
            await this.setState({fromMessages:false});
        }
      }

    yes = async () => {
        await this.setState({ isAbortProcessModalVisible: !this.state.isAbortProcessModalVisible });
        this.props.navigation.navigate('tab1');
    }
    no = async () => {
        await this.setState({ isAbortProcessModalVisible: !this.state.isAbortProcessModalVisible });
    }
    onPress = async () => {
        if (this.props.leftNavigation === 'null') {
            await this.setState({ isAbortProcessModalVisible: !this.state.isAbortProcessModalVisible });
        } else {
            this.props.navigation.dispatch(
                StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: this.props.leftNavigation })]
                })
            );
            this.props.navigation.navigate(this.props.leftNavigation)
        }

    }
    _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

    render() {
        const {IconStyle,HeaderTitle,headerBtn,Profile}=styles
        return (
            <Header style={styles.headerView}>
                <Left>
                    <Button style={headerBtn} transparent >
                    {this.state.fromMessages ?
                    <>
                    {/* <Icon name="chevron-left" style={IconStyle}></Icon> */}
                    <Image style={Profile} source={require('../../assets/profile2.jpeg')}/>
                    <Title allowFontScaling={false} style={HeaderTitle}>Rishi</Title>
                    </>:
                    <Icon name="chevron-left" style={IconStyle}></Icon>
                    }
                    </Button>
                </Left>
                <Title allowFontScaling={false} style={HeaderTitle}>{this.state.fromMessages ?'':'Messages'}</Title>
                <Right>
                <Menu visible={this.state.visible} onDismiss={this._closeMenu}
                 anchor={
                    <Button onPress={this._openMenu} style={headerBtn} transparent >
                    <Icon name="ellipsis-v" style={IconStyle}></Icon>
                    </Button>
                  }>
                  {this.state.menu.map((item)=>{
                      return(
                        <Menu.Item onPress={() => {}} title={item.item} />
                      )
                  })
                  }  
                </Menu>
                </Right>
            </Header>
        );
    }
}