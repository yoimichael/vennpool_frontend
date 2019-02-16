// First landing page upon opening app
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

import { Button, ThemeProvider } from 'react-native-elements';
import styles from '../styles/Styles';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 100; //280
const BAR_SPACE = 10; //10

const images = [
  'https://facebook.github.io/react/logo-og.png',
  'https://facebook.github.io/react/logo-og.png',
  'https://facebook.github.io/react/logo-og.png',
]

class InitialScreen extends Component{

  numItems = images.length;
  itemWidth = (FIXED_BAR_WIDTH/this.numItems) - ((this.numItems - 1) * BAR_SPACE);
  animVal = new Animated.Value(0);

  render() {
    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <Image
        key={`image${i}`}
        source={{uri: image}}
        style={ styles.devWidth}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp'
      })

      const thisBar = (
        <View
        key={`bar${i}`}
        style={[
          styles.track,
          {
            width: this.itemWidth,
            marginLeft: i === 0 ? 0 : BAR_SPACE,
          }
        ]}>
          <Animated.View
          style={[
            styles.bar,
            {
              width: this.itemWidth,
              transform: [{ translateX: scrollBarVal }]
            }
          ]}/>
        </View>
      )
      barArray.push(thisBar)
    }) //end of images.forEach loop

    return (
      <View style={styles.container}>

        <View style={styles.title}>
          <Text>V E N N P O O L</Text>
        </View>

        <View style={styles.container2}>
          <Text>Find people to share rides!</Text>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1} // affects bar animation smoothness
          pagingEnabled={true}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal }}}]
            )
          }>
            {imageArray}
          </ScrollView>
        </View>
        
        <View style={styles.container3}>
          <Button title="Hello Martin"/>
        </View>
      </View>


    )
  } // end of render
} // end of class


export default InitialScreen;
