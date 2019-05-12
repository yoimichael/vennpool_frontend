import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  // containers
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: deviceHeight-90,
  },
  eventContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#D86512',
    padding: 10,
    borderColor: '#D86512',
    backgroundColor: '#D86512',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 15/2,
  },
  infoContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatList:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 20,
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  colContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  rideContainer:{
    backgroundColor: '#D86512',
    padding: 10,
    borderColor: '#D86512',
    backgroundColor: '#D86512',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 15/2,
  },
  // Types of Text
  infoTxtTitle:{
    fontSize: 25,
    fontWeight: "bold",
  },
  txtTitle:{
    fontSize: 16,
    fontWeight: "bold",
  },
  driverTxtTitle:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  driverTxt:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal'
  },
  nameTxt:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
  },
  txt:{
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center'
  },

  // img
  img:{
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 100/2,
  },

  //btn
  btn:{
    width: 100,
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
  
});

export default styles;