import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import { withTheme, normalize } from 'react-native-elements';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  txtInput: {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },

  // Used for carousel
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fbContainer:{
    flexDirection: 'column',
    height: 200,
    width: deviceWidth,
    justifyContent: 'center'
  },
  cardSize: {
    flexDirection: 'column',
    width: deviceWidth,
    height: deviceHeight-200
  },
  
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2
  },

  bar: {
    backgroundColor: 'black',
    height: 2, // 2 
    position: 'absolute',
    left: 0, 
    right: 0
  },

  // For input styling (
  btn: {
    height: normalize(55),
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0  
  },
});

export default styles;