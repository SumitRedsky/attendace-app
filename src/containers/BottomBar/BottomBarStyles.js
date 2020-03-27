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
        // borderTopColor: "#B0BFC6",
        // elevation: 1  
    },
    Icons: {
        // backgroundColor: "#DF6923",
        height: 40,
        width: 40,
        borderColor: "#B0BFC6",
        borderRadius: 40 / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginBottom: 4
        // elevation: 1,
    },
    ClickedIcon: {
        backgroundColor: "#DF6923",
        height: 40,
        width: 40,
        borderColor: "#B0BFC6",
        borderRadius: 40 / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 1,
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
        color: "#DF6923",
        fontSize: 12
    }
}
export default styles;