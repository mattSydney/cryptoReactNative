//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
// When user has completed a goal display this...
const ViewOverlay = () => {
    return(
        <View style={styles.goalComplete}>
          <Text style={styles.goalCompleteText}>GOAL COMPLETE</Text>
        </View>  
      );
};

// define your styles
const styles = StyleSheet.create({
    goalComplete: {
        flex:1,
        backgroundColor:'orange',
        position:'absolute',
        height: '100%',
        width:'100%',
        opacity: 0.9,
        justifyContent:'center',
        alignItems:'center'
      },
      goalCompleteText: {
        fontWeight:'bold',
        fontSize:24,
        color:'white'
      },
});

//make this component available to the app
export default ViewOverlay;
