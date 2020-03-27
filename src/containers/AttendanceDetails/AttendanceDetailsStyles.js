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
          fontSize:18,
          fontWeight:"bold",
          color:'#DF6923'
      },
      ContentRow:{
          padding:16,
          paddingBottom:6,
          flexDirection:'row',
          justifyContent:'space-between',
          marginTop:5
      },
      WorkingDays:{
        color:'#DF6923',
        fontWeight:'bold'
      },
      Holidays:{
        color:'green',
        fontWeight:'bold'  
      },
      PresentDays:{
        color:'green',
        fontWeight:'bold'  
      },
      AbsentDays:{
        color:'red',
        fontWeight:'bold'
      },
      LeavesDays:{
        color:'orange',
        fontWeight:'bold'  
      }
}
export default styles