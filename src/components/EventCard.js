import React,  { Component } from 'react';
import { StyleSheet, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

class SectionHeader extends Component {
  onTest = async() => {
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
              style={styles.btn} 
              onPress={this.onTest}>
                <Text style={styles.btnTxt}>Share</Text>
            </TouchableOpacity>
            <Text style={styles.linkTxt}>*Link URL*</Text>
          </View>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={this.onTest}>
                <Text style={styles.btnTxt}>Offer A Ride</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

class EventCard extends Component{
  // Shows the SectionList component item click value using Alert
  GetSectionListItem = item => {
    return(Alert.alert(item));
  };

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={( {item} ) =>
            <TouchableOpacity 
              onPress={this.GetSectionListItem.bind(this, 
                `Driver: ` + item.admin + `\n` + 
                `Available Seats: ` + item.seats + `\n` +
                `Pickup Location Preference: ` + item.fromAddr + `\n` + 
                `Departure Time: ` + item.time + `\n` 
                
                )}>
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
          keyExtractor={(item, index) => item.admin}>
        </SectionList>
      </View> 
    );
  }
}

export default EventCard;