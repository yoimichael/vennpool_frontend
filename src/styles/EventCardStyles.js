import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({


  // Used for input box styling
  container:{
    flex: 1,
    marginTop: 0,
  },
  subCardHeaderContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  subCardTxtContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  },
  itemContainer: {
    flex: 1,
    width: deviceWidth,
    flexDirection: 'column',
    backgroundColor: 'rgb(98, 197, 184)'
  },

  header: {
    flex: 1,
    backgroundColor: 'rgb(77,120,140)'
  },
  headerTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    margin: 20
  },

  subCardHeader:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(173, 252, 250)',
  },
  subCardTxt:{
    fontSize: 16,
    color: 'rgb(173,252, 250)'
  }
});

export default styles;