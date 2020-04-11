import * as colors from "../../constants/colors";

const styles = {
    Container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        position: "absolute",
        bottom: 0,
        height: "12%",
        width: "100%",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderTopWidth: 2,
        borderColor: "#EFEDF0", 
    },
    Icons: {
        height: 40,
        width: 40,
        borderColor: "#B0BFC6",
        borderRadius: 40 / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginBottom: 4
    },
    ClickedIcon: {
        backgroundColor: colors.primaryColor,
        height: 40,
        width: 40,
        borderColor: "#B0BFC6",
        borderRadius: 40 / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4
    },
    BottomBarContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    BeforeClickedText: {
        color: "black",
        fontSize: 12
    },
    ClickedText: {
        color: colors.primaryColor,
        fontSize: 12
    }
}
export default styles;