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
import { setAllGoals, increaseCompletionValue, deleteGoal } from '../store/actions/GoalActions'
import ListView from '../components/ListView';
import { ButtonImage } from '../components/buttons/ButtonImage';
import Colors from '../constants/Colors';
import PortfolioContainer from '../components/PortfolioContainer';

class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    title: 'Portfolio',
    headerStyle: {
      backgroundColor: Colors.headerColor, 
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    }, 
    headerRight: (
      <ButtonImage onPress={() => {
        navigation.navigate('AddCoin')
      }} />
    ),
    headerLeft: null
  });


  render() {
    // if no plans then show welcome view


    if (this.props.coins.length > 0) {
      return (
     
        <PortfolioContainer
         />

  
      )
    } else {
      return (
        <View style={styles.helpView}>
          <Text>Click the + button on the top right to add currencies to your Portfolio</Text>
        </View>
      )
    }
  };
}
const mapStateToProps = state => {
  
  return {
    coins: state.userData.coins
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },

});
export default connect(mapStateToProps, { setAllGoals, deleteGoal })(PortfolioScreen);