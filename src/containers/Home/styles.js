import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import { Dimensions } from 'react-native';
const styles = {
    UserName: {
        // textAlign: "center",
        color: colors.primaryColor,
        fontSize: 26
    },
    Header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    InOutTime: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 42
    },
    Time: {
        color: "#E6B0B0",
        marginTop: 5
    },
    MenuIcon: {
        color: colors.primaryColor,
    },
    InIcon: {
        transform: [{
            rotate: "30deg"
        }],
        marginTop: 15,
        color: "#57AA62"
    },
    OutIcon: {
        transform: [{
            rotate: "30deg"
        }],
        position: "absolute",
        top: 50,
        right: 0,
        color: "#DE5F68"
    },
    HoursContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    MainContainer: {
        width: Dimensions.get('window').width-80,
        height: Dimensions.get('window').width-80,
        borderRadius:Math.round(Dimensions.get('window').width-80 + Dimensions.get('window').height-80) / 2,
        // height: 280,
        // width: 280,
        // borderRadius: 280 / 2,
        borderWidth: 3,
        borderColor: "#3A454B"
    },
    ColoredContainer: {
        width: Dimensions.get('window').width-140,
        height: Dimensions.get('window').width-140,
        borderRadius:Math.round(Dimensions.get('window').width-140 + Dimensions.get('window').height-140) / 2,
        // height: 215,
        // width: 215,
        // borderRadius: 210 / 2,
        borderWidth: 4,
        borderColor: "#DE5F68"
    },
    DateTimeContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign:'center',
        paddingTop: 40,
        paddingBottom: 40,
        width: Dimensions.get('window').width-160,
        height: Dimensions.get('window').width-160,
        borderRadius:Math.round(Dimensions.get('window').width-160 + Dimensions.get('window').height-160) / 2,
        // height: 200,
        // width: 200,
        // borderRadius: 200 / 2,
        color: "white"
    },
    BottomContainer: {
        backgroundColor: "#57AA62"
    },
    DialogBox: {
        height: "16%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        borderRadius: 20
    },
    ConfirmButton: {
        backgroundColor: colors.primaryColor,
        padding: 6,
        borderRadius: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20
    },
    PunchInHourText: {
        fontSize:fonts.FONT_HEADING,
        color: "green"
    },
    PunchOutHourText: {
        fontSize: fonts.FONT_HEADING,
        color: colors.primaryColor
    },
    OverText:{
        fontSize: fonts.FONT_HEADING,
        color:'white'
    },
    CurrentDate: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    Container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        zIndex: 0
    },
    AnimatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10,
        position: "absolute",
        height: "100%",
        zIndex: 1000
    },
    Body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F04812'
    },
    Box: {
        color: 'white',
        fontSize: 26,
        // top: 40
    },
    DateText: {
        fontSize: 17,
        color: colors.primaryColor
    }
}
export default styles;