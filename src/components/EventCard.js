import React,  { Component } from 'react';
import { StyleSheet, View, Text, SectionList, Alert, TouchableOpacity} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class SectionHeader extends Component {
  onTest = async() => {
    console.log("on test trigered");
    
    // Actions.Auth(); 
  }

  render() {
    return (
      <View style={styles.header}>
          <Text style={styles.headerTxt}>{this.props.section.title}</Text>
          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.signoutBtn} 
              onPress={this.onTest}>
                <Text style={styles.txtBtn}>Share</Text>
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
                `Destination Location: ` + item.toAddr + `\n` +
                `Departure Time: ` + item.time + `\n` 
                
                )}>
                <View style={styles.itemContainer}>
                  <View style={styles.subCardHeaderContainer}>
                    <Text style={styles.subCardHeader}>
                      Driver: {item.admin}
                    </Text>
                    <Text style={styles.subCardHeader}>
                      Seats Available: {item.seats}
                    </Text>
                  </View>

                  <View style={styles.subCardTxtContainer}>
                    <Text style={styles.subCardTxt}>
                      Pickup Location Preference: {item.fromAddr}
                    </Text>
                    <Text style={styles.subCardTxt}>
                      Destination Location: {item.toAddr}
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