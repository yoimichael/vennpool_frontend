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
    flex: .1
  },
  // For input styling (
  txtBtn:{
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  logoutBtn: {
    width: 100
  },
  txtInput: {
    height: 30,
    width: Dimensions.get('window').width,
    flex: .08,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    margin: 5
  },
});

export default styles;