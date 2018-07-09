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
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import CoinContainer from '../components/CoinContainer';
import NewsContainer from '../components/NewsContainer';

export default class NewsScreen extends React.Component {
  static navigationOptions = {
    title: 'News',
    headerStyle: {
      backgroundColor: Colors.headerColor, 
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    }, 
  };

  
  render() {        
    return (
      <View style={styles.container}>
       <NewsContainer
        navigation={this.props.navigation}  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
//https://medium.com/react-native-training/tutorial-react-native-redux-native-mobile-app-for-tracking-cryptocurrency-bitcoin-litecoin-810850cf8acc

// c90eb75f92bb46de92459e6d83a5dbb5