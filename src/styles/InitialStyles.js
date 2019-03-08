import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

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
    backgroundColor: '#FAEBD7',
    flex: 1
  },

  spacer: {
    flex: .1
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAEBD7',
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

  // For input styling (
  btn: {
    height: 30,
    width: 200,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'orange'
  },
  txtBtn:{
    textAlign: 'center',
    fontSize: 20
  }
});

export default styles;