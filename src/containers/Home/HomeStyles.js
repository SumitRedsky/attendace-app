const styles = {
    UserName: {
        textAlign: "center",
        color: "#DF6923",
        fontSize: 26
    },
    Header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    InOutTime: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 48
    },
    Time: {
        color: "#E6B0B0",
        marginTop: 5
    },
    MenuIcon: {
        color: "#DF6923",
    },
    InIcon: {
        transform: [{
            rotate: "30deg"
        }],
        marginTop: 15,
        color: "#57AA62"
    },
    OutIcon: {
        transform: [{
            rotate: "30deg"
        }],
        position: "absolute",
        top: 50,
        right: 0,
        color: "#DE5F68"
    },
    HoursContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    MainContainer: {
        height: 280,
        width: 280,
        borderRadius: 280 / 2,
        borderWidth: 3,
        borderColor: "#3A454B"
    },
    ColoredContainer: {
        height: 215,
        width: 215,
        borderRadius: 210 / 2,
        borderWidth: 4,
        borderColor: "#DE5F68"
    },
    DateTimeContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 35,
        paddingBottom: 20,
        height: 200,
        width: 200,
        borderRadius: 200 / 2,
        // backgroundColor: "#526573",
        color: "white"
    },
    BottomContainer: {
        backgroundColor: "#57AA62"
    },
    DialogBox: {
        height: "16%",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        borderRadius: 20
    },
    ConfirmButton: {
        backgroundColor: "#DF6923",
        padding: 6,
        borderRadius: 3,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20
    },
    PunchInHourText: {
        fontSize: 16,
        color: "green"
    },
    PunchOutHourText: {
        fontSize: 16,
        color: "#DF6923"
    },
    CurrentDate: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    Container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        zIndex: 0
    },
    AnimatedBox: {
        flex: 1,
        backgroundColor: "#38C8EC",
        padding: 10,
        position: "absolute",
        height: "100%",
        zIndex: 1000
    },
    Body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F04812'
    },
    Box: {
        color: 'white',
        fontSize: 26,
        top: 40
    }
}
export default styles;