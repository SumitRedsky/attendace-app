const styles = {
    Title:{
        fontSize: 16,
        fontWeight:'bold',
        color: 'white' 
    },
    Row:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        height:50,
        marginBottom:5,
        width:330,
        paddingLeft:16,
        paddingRight:16,
        alignItems:'center',
        backgroundColor: '#DF6923',
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
        // marginLeft:15,
        // marginRigth:15,
        marginBottom:5,
        width:330,
        marginTop:-6,
        borderWidth:1,
        borderColor:'#DF6923',
        color:'#DF6923'
    },
     Selectors:{
        flexDirection:'row',
        justifyContent:'space-between'
      },
      PuchDetail:{
        margin:8
      },
      TextStyle:{
        color:'#DF6923',
        fontSize:16,
        fontWeight:'bold'
      }
}
export default styles