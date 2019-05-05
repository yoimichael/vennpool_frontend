import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const styles = StyleSheet.create({
  // Used for input box styling
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F4F4ED',
    flex: 1
  },
  containerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle:{
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  txt:{
    fontSize: 15,
    fontWeight: "normal",
    width: 250,
    height:50,
    borderWidth: 1,
    marginBottom: 5,
    textAlign: 'center',
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
  },
  txtExtra:{
      alignSelf: 'center',
      fontSize: 10,
      fontWeight: "normal",
  },

  img:{
    marginTop: 10,
    height: 150,
    width: 150,
    borderRadius: 150/2,
  },
  containerMain:{
    flex:1,
  },

  // For input styling (
  signoutBtn:{
    width: 90,
    height:30,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    borderWidth: 1,
    borderRadius: 15/2,


  },
  txtBtn:{
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: "normal",
  }
});

export default styles;