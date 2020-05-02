import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import { Dimensions } from 'react-native';
const styles = {
    Title:{
        fontSize: fonts.FONT_HEADING,
        fontWeight:fonts.FONT_BOLD,
        color: 'white' 
    },
    Row:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        height:50,
        marginBottom:5,
        // width:330,
        width: Dimensions.get('window').width-30,
        paddingLeft:16,
        paddingRight:16,
        alignItems:'center',
        backgroundColor: colors.primaryColor,
    },
    InternalRow:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:300,  
    },
    ParentHr:{
        height:1,
        color: 'white'
    },
    Child:{
        padding:16,
        marginBottom:5,
        width: Dimensions.get('window').width-30,
        // width:330,
        marginTop:-6,
        borderWidth:1,
        borderColor:colors.primaryColor,
        color:colors.primaryColor
    },
     Selectors:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      PuchDetail:{
        margin:8
      },
      TextStyle:{
        color:colors.primaryColor,
        fontSize:fonts.FONT_HEADING,
        fontWeight:fonts.FONT_BOLD
      }
}
export default styles