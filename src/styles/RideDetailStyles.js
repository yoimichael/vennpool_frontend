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
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#D86512',
    borderRadius: 5,
    width: deviceWidth-30,
    padding: 10
  },
  driverContainer:{
    flexDirection: 'column',
    alignItems: 'left',
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
    alignItems: 'left',
  },
  flatList:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight:0,
    minWidth: 0
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  },
  rideContainer:{
    backgroundColor: '#D86512',
    padding: 10,
    borderColor: '#D86512',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 15/2,
  },
  // Types of Text
  infoTxtTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTxt:{
    fontSize: 30,
    fontWeight: 'normal',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  txtTitle:{
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  txt:{
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white'
  },
  txtOthers:{
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white'
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
    height:40,
    borderWidth: 1,
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    borderWidth: 1,
    borderRadius: 15/2,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10
  },
  
});

export default styles;