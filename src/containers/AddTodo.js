import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
class AddTodo extends Component {

  state = {
    text: ''
  }

  addTodo = (text) => {
    // update redux store
    this.props.dispatch({type: 'ADD_TODO', text})
    this.setState({text: ''})
  }
  render (){
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <TextInput
          onChangeText = {(text)=> this.setState({ text })}
          value = {this.state.text}
          placeholder="Placeholder text"
          style= {{borderWidth: 1, borderColor: 'green', backgroundColor: '#eaeaea', height: 50, flex: 1, padding: 5 }}
        />

        <TouchableOpacity onPress = {() => this.addTodo(this.state.text)}>
          <View style={{height: 50, backgroundColor: '#eaeaea', alignItems: 'center', justifyContent:'center'}}>
            <Ionicons name="md-add" size={30} />
          </View>
        </TouchableOpacity>

      </View>
    );   
  }
}

export default connect()(AddTodo);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});