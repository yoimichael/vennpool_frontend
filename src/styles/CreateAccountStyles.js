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
  containerTop:{
    flex:2
  },
  containerBottom:{
    flex: 1
  },
  inputRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  txtInput: {
    width: 250,
    height:30,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  inputTitle:{
    textAlign: 'left',
    fontSize: 15,
    width:50
  },
  spacer:{
    flex:0.05
  },
  img:{
    height: 150,
    width: 150,
    margin: 20
  }
});

export default styles;