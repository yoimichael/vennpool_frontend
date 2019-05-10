import React,  { Component } from 'react';
import { StyleSheet, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Actions } from 'react-native-router-flux';


class SectionHeader extends Component {
  onOfferRide = async() => {
    console.log("on test trigered");
    Actions.OfferRide(); 
  }

  render() {
    return (
      <View style={styles.header}>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>{this.props.section.title}</Text>
          </View>
          <View style={styles.headerShare}>
            <TouchableOpacity 
              style={styles.shareBtn} 
              onPress={this.onOfferRide}>
                <Text style={styles.btnTxt}>Share</Text>
            </TouchableOpacity>
            <Text style={styles.linkTxt}>{this.props.section.share}</Text>
          </View>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.offerBtn} 
              onPress={this.onOfferRide}>
                <Text style={styles.btnTxt}>Offer A Ride</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class EventList extends Component{
  // Shows the SectionList component item click value using Alert
  GetSectionListItem = item => {
    return(Alert.alert(item));
  };
  constructor(props){
    super(props);
    console.log(`EventList received: ${JSON.stringify(props)}`);
    
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={( {item} ) =>
            <TouchableOpacity onPress={Actions.RideDetail}>
                <View style={styles.itemContainer}>
                  <View style={styles.rideCardContainer}>
                    <Text style={styles.subCardHeader}>
                      Driver: {item.admin}
                    </Text>
                    <Text style={styles.subCardHeader}>
                      Seats Available: {item.seats}
                    </Text>
                    <Text style={styles.subCardTxt}>
                      Pickup Location: {item.fromAddr}
                    </Text>
                    <Text style={styles.subCardTxt}>
                      Departure Time: {item.time}
                    </Text>
                  </View>
                </View>
            </TouchableOpacity>
          }
          renderSectionHeader={ ({section}) => {
            return(<SectionHeader section={section}/>);
          }}
          sections={sectionListData}
          keyExtractor={(item, index) => item.id}>
        </SectionList>
      </View> 
    );
  }
}

export default EventList;