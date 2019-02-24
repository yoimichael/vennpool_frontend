// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, Animated, Keyboard, ScrollView, TextInput, TouchableOpacity  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, ThemeProvider } from 'react-native-elements';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL }from '../styles/InitialStyles';
import CarouselView from '../components/CarouselView';

class InitialScreen extends Component{
  static navigationOptions = {
    headerStyle: {
      height: 0,
      backgroundColor: '#FAEBD7',
    }
  };

  constructor(props){
    super(props);
    this.state = {text: '(xxx)-xxx-xxxx'};

    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT_SMALL,
      }),
    ]).start();
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.imageHeight, {
        duration: event.duration,
        toValue: IMAGE_HEIGHT,
      }),
    ]).start();
  };

  render() {
    return (
    <View style={styles.container}>
        <View style={styles.carousel}>
          <CarouselView/>
        </View>
        
        <Animated.View 
          style={
            [styles.container, { 
            paddingTop: 10, 
            paddingBottom: this.keyboardHeight 
          }]}
        >
            <TextInput
              style={styles.txtInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <View style={styles.spacer}></View>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={() => this.props.navigation.navigate('CreateAccount')}>
                <Text style={styles.txtBtn}>Submit</Text>
            </TouchableOpacity>
        </Animated.View>
      </View>
    );
  } // end of render
} // end of class


export default InitialScreen;
