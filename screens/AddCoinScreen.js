import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { setAllGoals, increaseCompletionValue, deleteGoal } from '../store/actions/GoalActions'
import SearchBarListView from '../components/SearchBarListView';
import AddCoin from '../components/AddCoin';

class AddCoinScreen extends React.Component {
  static navigationOptions = {
    title: 'Portfolio',
    headerStyle: {
      backgroundColor: Colors.headerColor,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    },
    headerBackTitleStyle: {
      color: 'white'
    },
  };

  state = { 
    inAddCoin: false,
    coinId: null
  }

  onCoinPickedHandler = (coinId) => {

    // Alert.alert(fruit_name);
    
    let screenMode = !this.state.inAddCoin;
    this.setState({inAddCoin: screenMode,  coinId})
    
  }


  render() {
    //console.log(this.state)
    if(this.state.inAddCoin) {
      return (
       <AddCoin
       coinId={this.state.coinId}
       cancelHandler={
         () => this.setState({inAddCoin:false})}
       />
      )
    }
    return (
      <SearchBarListView
        onCoinPickedHandler={this.onCoinPickedHandler}
      />

    )
  };
}
const mapStateToProps = state => {

  return {
    goals: state.goal.goals
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
export default connect(mapStateToProps, { setAllGoals, deleteGoal })(AddCoinScreen);