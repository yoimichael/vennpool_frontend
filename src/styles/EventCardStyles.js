import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  // Used for input box styling
  container:{
    flex: 1,
    flexDirection: 'column',
  },
  rideCardContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 20,
    alignItems: 'flex-start'
  },
  subCardTxtContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  },
  itemContainer: {
    flex: 1,
    width: deviceWidth -60,
    flexDirection: 'column',
    backgroundColor: '#ECAA48', 
    borderColor: '#ECAA48',
    borderWidth: 1,
    borderRadius: 15/2,
    marginBottom: 5,
    alignSelf: 'center',
  },

  header: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D86512',
    width: deviceWidth-30,
    borderRadius: 15/2,
    borderWidth: 1,
    borderColor:'#D86512',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    alignItems: 'center'
  },
  headerShare:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D86512',
    justifyContent: 'center'
  },
  linkTxt:{
    fontSize: 15,
    fontWeight: 'normal',
    color: 'white',
    alignSelf: 'center'
  },
  headerTxt:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 5,

  },
  detailHeaderTxt:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  detailInfoTxt:{
    fontSize: 15,
    color: 'white',
  },
  subCardHeader:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  subCardTxt:{
    fontSize: 16,
    color: 'black',
  },

  btnTxt: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: "normal",
  },
  shareBtn:{
    width: 70,
    height:30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    alignSelf: 'center',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    borderRadius: 15/2,
  },
  offerBtn:{
    width: 120,
    height:30,
    borderWidth: 1,
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    alignSelf: 'center',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    borderRadius: 15/2,
  },

  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default styles;