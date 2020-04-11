import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
const styles={
    CalenderContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        marginBottom:300
      },
      Heading:{
          marginTop: 20,
          textAlign:'center',
          fontSize:fonts.FONT_PAGE_HEADING,
          fontWeight:fonts.FONT_BOLD,
          color:colors.primaryColor
      },
      ContentRow:{
          padding:16,
          paddingBottom:6,
          flexDirection:'row',
          justifyContent:'space-between',
          marginTop:5
      },
      WorkingDays:{
        color:colors.primaryColor,
        fontWeight:fonts.FONT_BOLD
      },
      Holidays:{
        color:'green',
        fontWeight:fonts.FONT_BOLD
      },
      PresentDays:{
        color:'green',
        fontWeight:fonts.FONT_BOLD
      },
      AbsentDays:{
        color:'red',
        fontWeight:fonts.FONT_BOLD
      },
      LeavesDays:{
        color:'orange',
        fontWeight:fonts.FONT_BOLD  
      }
}
export default styles