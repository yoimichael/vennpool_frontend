import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const styles = StyleSheet.create({
  // Used for input box styling
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F4F4ED',
    flex: 1
  },
  txtTitle:{
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "bold",
  },
  txt:{
    fontSize: 15,
    fontWeight: "normal",
    textAlign: 'left',
  },
  // For input styling (
  submitBtn:{
    width: 90,
    height:30,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#F8B261',
    backgroundColor: '#F8B261',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .25,
    borderRadius: 15/2,
  },
  txtBtn:{
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: "normal",
  }
});

export default styles;