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