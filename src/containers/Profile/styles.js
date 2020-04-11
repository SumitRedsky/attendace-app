import * as colors from "../../constants/colors";
const styles = {
    Container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:20
    },
    Profile: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2
    },
    UserName:{
        marginTop:5,
        fontSize:20,
        color:colors.primaryColor
    },
    Buttons:{
        backgroundColor:colors.primaryColor,
        borderRadius:20,
        padding:10,
        marginBottom:5,
        alignItems:'center'
    },
    DialogBox: {
        // alignItems: "center",
        // justifyContent: "center",
        // margin: "auto",
        // borderRadius: 20
    },
    ConfirmButton: {
        backgroundColor: colors.primaryColor,
        padding: 6,
        borderRadius: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
        marginRight:15
    },
    RowElement:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    Heading:{
        color:colors.primaryColor,
        textAlign: "center",
        fontSize:20
    },
    Label:{
        marginTop:20
    },
    InputBox: {
        width:135,
        borderBottomWidth: 2,
        borderColor: "#B0BFC6",
       
    },
}
export default styles;