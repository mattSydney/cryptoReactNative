//import libs
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Simple view for when the app is loading
const ViewLoading = () => {
    return(
        <View style={styles.goalComplete}>
          <Text style={styles.goalCompleteText}>LOADING...</Text>
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
export default ViewLoading;
