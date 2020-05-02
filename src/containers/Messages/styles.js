import * as colors from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import {
    Dimensions
} from 'react-native';

const styles = {
    Container: {
        marginBottom: Dimensions.get('window').height - 555,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'F7F7F7'
    },
    ChatMessages: {
        backgroundColor: 'white',
        borderRadius: 6,
        minWidth: 'auto',
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: Dimensions.get('window').width - 100,
        alignSelf: 'flex-start'
    },
    SelfMessages: {
        alignSelf: 'flex-end',
        backgroundColor: colors.primaryColor
    },
    FieldContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    InputFieldStyle: {
        backgroundColor: '#E9E9E9',
        width: Dimensions.get('window').width - 80,
        borderRadius: 30,
        alignSelf: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        maxHeight: 60,
        fontSize: 16
    },
    IconContainer: {
        height: 44,
        width: 44,
        borderRadius: 50 / 2,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contain: {
        minWidth: 'auto',
        maxWidth: Dimensions.get('window').width - 100,
        // alignSelf: 'flex-start'
    },
    MessageTimingStyle: {
        color: 'grey',
        fontSize: 12,
        textAlign: 'right',
        alignSelf: 'stretch'
    },
    OwnMessage: {
        color: 'white',
    }
}
export default styles