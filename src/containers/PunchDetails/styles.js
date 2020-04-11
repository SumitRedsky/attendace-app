import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";

const styles = {
  Container: {
    margin: 15,
    marginTop: 25
  },
  Heading: {
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: fonts.FONT_PAGE_HEADING,
    fontWeight: fonts.FONT_BOLD,
    color: colors.primaryColor
  },
  Selectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  PuchDetail: {
    marginTop: 70,
    marginLeft: 5,
    marginRight: 5,
    marginLeft: 15,
    marginRight: 15
  },
  Buttons: {
    padding: 2,
    paddingTop:10,
    paddingBottom:10,
    borderColor: colors.primaryColor,
    borderRadius: 20,
    borderWidth: 2,
    width: 90,
    alignItems: 'center',
    marginLeft: 14,
    marginRight: 14
  },
  ClickedButtons: {
    padding: 2,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor: colors.primaryColor,
    borderRadius: 20,
    width: 90,
    alignItems: 'center',
    marginLeft: 14,
    marginRight: 14
  },
  TextStyle: {
    color: colors.primaryColor,
    fontSize: fonts.FONT_HEADING,
    fontWeight: fonts.FONT_BOLD
  },
  WeeklyPunchDetail: {
    position: "absolute",
    top: 150,
    bottom: 84,
    marginLeft: 15,
    marginRight: 15
  },
  UnselectedButton:{
    color:'white'
  },
  SelectedButton:{
    color:colors.primaryColor
  }
}
export default styles