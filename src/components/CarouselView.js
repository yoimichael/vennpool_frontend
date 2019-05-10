import React,  { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import styles from '../styles/InitialStyles';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 100; //280
const BAR_SPACE = 10; //10

const images = [
  require('../../assets/Card1.png'),
  require('../../assets/Card2.png'),
  require('../../assets/Card3.png'),
]

class CarouselView extends Component{

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
        source={image}
        style={ styles.cardSize}
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
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      scrollEventThrottle={1} // affects bar animation smoothness
      pagingEnabled={true}
      onScroll={
        Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.animVal }}}]
        )
      }>
        {imageArray}
      </ScrollView>
    );
  }
}

export default CarouselView;