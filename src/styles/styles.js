import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const styles = StyleSheet.create({
  temp: {
   flex: 1, 
   alignItems: 'center', 
   justifyContent: 'flex-start',
   flexDirection: 'column'
  },

  // Used for carousel
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    flex: 1
  },

  title: {
    width: Dimensions.get('window').width,
    fontSize: 900,  //FIX
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    flex: .5
  },
  carousel: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },  
  containerbtn: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'yellow',
    flex: 1.5
  },    

  devWidth: {
    width: Dimensions.get('window').width
  }, 
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2
  },
  barContainer: {
    // position: 'absolute',
    zIndex: 2,
    // top: 40
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bar: {
    backgroundColor: 'black',
    height: 2, // 2 
    position: 'absolute',
    left: 0, 
    right: 0
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  btn: {
    width: 100  
  }
});

export default styles;