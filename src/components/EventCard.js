import React,  { Component } from 'react';
import { StyleSheet, View, Text, Image, SectionList} from 'react-native';
import styles from '../styles/EventCardStyles';
import {sectionListData} from '../data/sectionListData';

class SectionListItem extends Component{
  render(){
    return(
      <View style={styles.itemContainer}>
        <View style={styles.subCardHeaderContainer}>
          <Text style={styles.subCardHeader}>
            Driver: {this.props.item.admin}
          </Text>
          <Text style={styles.subCardHeader}>
            Seats Available: {this.props.item.seats}
          </Text>
        </View>

        <View style={styles.subCardTxtContainer}>
          <Text style={styles.subCardTxt}>
            Pickup Location Preference: {this.props.item.fromAddr}
          </Text>
          <Text style={styles.subCardTxt}>
            Destination Location: {this.props.item.toAddr}
          </Text>
          <Text style={styles.subCardTxt}>
            Departure Time: {this.props.item.time}
          </Text>
        </View>
      </View>
    );
  }
}

class SectionHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
          <Text style={styles.headerTxt}>{this.props.section.title}</Text>
      </View>
    );
  }
}
class EventCard extends Component{
  
  render() {
    return (
      <View style={styles.container}>
        <SectionList
            renderItem={( {item, index} ) =>{
              return(<SectionListItem item={item} index={index}></SectionListItem>);
            }}
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