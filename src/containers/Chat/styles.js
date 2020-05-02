import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import {
  Dimensions
} from 'react-native';

const styles = {
  Container: {
    marginBottom:Dimensions.get('window').height-545
    // marginBottom:140
  },
  ProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ListItem: {
    flexDirection: 'row',
    heigth: 50,
    marginRight:15,
    marginLeft:15,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:2
  },
  Profile: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight:12
  },
  TextStyle:{
    fontWeight:fonts.FONT_BOLD,
    fontSize:fonts.FONT_HEADING
  },
  TimeStyle:{
    color:'grey',
    fontSize:12
  }
}
export default styles