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
    fontSize: 900,  //FIX
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: .5
  },
  container2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },  
  container3: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
//    position: 'absolute',
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
  button: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1
  }
});

export default styles;