import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
const styles = {
    Container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
    },
    Icon: {
        height: 100,
        width: 100
    },
    Heading: {
        fontSize: 30,
        color: "#36474F",
        marginTop: 30,
    },
    InputBox: {
        marginTop: 20,
        width: 260,
        borderWidth: 2,
        borderColor: "#B0BFC6",
        borderRadius: 40,
        textAlign: "center",
    },
    LoginButton: {
        marginTop: 40,
        padding: 9,
        backgroundColor: colors.primaryColor,
        borderRadius: 40,
        width: 130
    },
    BackButton: {
        position: 'absolute',
        height: 24,
        width: 50,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#E26429',
        zIndex: 10,
        top: 10,
        left: 10
    },

    LoginText: {
        textAlign: "center",
        color: "white"
    },
    ForgotPasswordText: {
        color: "#36474F",
        marginTop: 20
    },
    BottomText: {
        fontSize: fonts.FONT_PAGE_HEADING,                                
        position: 'absolute',
        bottom: 0,
        fontFamily: "Arial",
        fontWeight: '100'
    },
    Logo: {
        color: "#B11115",
        fontWeight: 'bold',
        fontSize: 22
    }
}
export default styles;