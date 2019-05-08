import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const styles = StyleSheet.create({
  // Used for input box styling
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAEBD7',
    flex: 1
  },
  spacer: {
    flex: .025
  },
  // For input styling (
  txtBtn:{
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height:3},
    textShadowRadius: 5,
  },
  btn: {
    width: 100
  },
});

export default styles;