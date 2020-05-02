import {
    StyleSheet,
    Platform,
} from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as colors from "../../constants/colors"
import * as fonts from "../../constants/fonts";

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: colors.headerColor
    },
    wrapper: {
        flex: 1
    },
    headerBtn: {
        marginLeft: "8%"
    },
    IconStyle:{
     fontSize:22,
     color:colors.primaryColor
    },
    HeaderTitle: {
        color: colors.primaryColor,
        fontSize: fonts.FONT_HEADING,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                marginLeft: 0
            },
            android: {
                marginLeft: '20%'
            }
        })

    },
    Profile:{
        height:38,
        width:38,
        borderRadius:38/2,
        // marginLeft:10
    }
})
export default styles