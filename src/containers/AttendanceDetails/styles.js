import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import {
  Dimensions
} from 'react-native';
const styles = {
  CalenderContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 18
    // marginTop: 20,
    // marginBottom: 300,
  },
  Heading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: fonts.FONT_PAGE_HEADING,
    fontWeight: fonts.FONT_BOLD,
    color: colors.primaryColor
  },
  ContentRow: {
    padding: 16,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  ContentColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 16,
    // paddingBottom:6,
  },
  WorkingDays: {
    color: colors.primaryColor,
    // fontWeight: fonts.FONT_BOLD
  },
  Holidays: {
    color: '#097FEB',
    // color:'green',
    fontWeight: fonts.FONT_BOLD
  },
  PresentDays: {
    color: 'green',
    fontWeight: fonts.FONT_BOLD
  },
  AbsentDays: {
    color: 'red',
    fontWeight: fonts.FONT_BOLD
  },
  LeavesDays: {
    color: 'orange',
    fontWeight: fonts.FONT_BOLD
  },
  CardStyle: {
    borderRadius: 10,
    backgroundColor: 'grey',
    // width: Dimensions.get('window').width - 10,
    width: Dimensions.get('window').width - 190,
    margin:3
  }
}
export default styles