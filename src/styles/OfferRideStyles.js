import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  // Used for input box styling
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventContainer:{
    marginTop: deviceHeight/30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  yourinfoContainer:{
    marginTop: deviceHeight/30,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#D86512',
    backgroundColor: '#D86512',
    borderRadius: 15/2,
    borderWidth: 1,
  },
  locationContainer:{
    marginTop: deviceHeight/30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  timeContainer:{
    marginTop: deviceHeight/30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtTitle:{
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "bold",
  },
  txt:{
    fontSize: 15,
    fontWeight: "normal",
    textAlign: 'left',
  },
  infoTxt:{
    fontSize: 15,
    fontWeight: "normal",
    textAlign: 'left',
    color: 'white'
  },
  infoTxtTitle:{
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "bold",
    color: 'white'
  },
  // For input styling (
  submitBtn:{
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
    borderRadius: 15/2,
    alignSelf: 'center'
  },
  txtInput:{
    width: deviceWidth-30,
    height: 50,
    borderWidth: 1,
    borderRadius: 15/2,    
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    textAlign: 'center',
    alignSelf: 'center'
  },
  txtInputSeats:{
    width: 30,
    height: 30,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 15/2,    
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    textAlign: 'center',
    alignSelf: 'center'
  },
  txtBtn:{
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: "normal",
  }
});

export default styles;