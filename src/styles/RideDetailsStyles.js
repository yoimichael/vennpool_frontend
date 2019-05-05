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
  containerTop:{
    flex:1
  },

  // Types of Text
  txtEvent:{

  },
  txtTitle:{
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  img:{
    height: 150,
    width: 150,
    borderRadius: 150/2,
  },
  containerMain:{
    flex:1,
  },
  spacer:{
    flex:0.05
  },

  // For input styling (
  
  
});

export default styles;