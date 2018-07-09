import React from 'react';
import {  
  StyleSheet,
  View,
  WebView,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import CoinContainer from '../components/CoinContainer';
import NewsContainer from '../components/NewsContainer';

export default class NewsWebScreen extends React.Component {
  static navigationOptions = {
    title: 'News Article',
    headerStyle: {
      backgroundColor: Colors.headerColor, 
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff'
    }, 
  };

  renderLoadingView() {
    return (
      <ActivityIndicator
        color='#ccc'
        size='large'
        styles={styles.activityIndicator}
      />
    );
  }
  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url')
    console.log(url)
    return (
      <View style={styles.container}>
        <WebView
                source={{uri: url}}
                style={{marginTop: 20}}
                renderLoading={this.renderLoadingView}
                startInLoadingState={true}
              />
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
