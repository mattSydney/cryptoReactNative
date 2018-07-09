//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { coinAPIURL } from '../constants/Constants';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { addCoin, coinFormUpdate } from '../store/actions/UserDataActions';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'

// create a component
class AddCoin extends Component {

  state = {
    // from axios
    coinData: null,
    error: null,
    coinTradePriceError: null,
    coinQuantityError: null,
    totalValue: 0,
    tradeDate: new Date()
  }

  componentDidMount() {
    const id = this.props.coinId;
    axios.get(`${coinAPIURL}/v2/ticker/${id}`)
      .then(res => {
        const data = res.data;
        this.setState({ coinData: data.data });
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  calculateTotalValue() {
    const coinTradePrice = Number(this.props.coinTradePrice)
    const coinQuantity = Number(this.props.coinQuantity)
    const result = coinTradePrice * coinQuantity
    return isNaN(result) ? "" : `${result}`
    //return `${coinTradePrice * coinQuantity}`
  }

  submitForm = () => {
    console.log(this.state)
    let hasValidationError = false;
    // temp object to loop through form elements 
    // validation error state is held locally not in redux
    // Any other errors such as disk write errors are in redux
    const formElementsToCheck = [
      {
        input: this.props.coinTradePrice,
        errorState: 'coinTradePriceError'
      },
      {
        input: this.props.coinQuantity,
        errorState: 'coinQuantityError'
      },
    ]

    // check each form element for data and then populate the required
    // error field in local state from the errorState key
    formElementsToCheck.forEach((formElement) => {
      console.log(formElement)
      if (formElement.input === '') {
        hasValidationError = true;
        this.setState(prevState => {
          return {
            ...prevState,
            [formElement.errorState]: 'This field cannot be blank'
          }
        })
      } else {
        this.setState(prevState => {
          return {
            ...prevState,
            [formElement.errorState]: null
          }
        })
      }
    })

    if (hasValidationError) {
      return;
    }

    const { id, name, quotes, symbol } = this.state.coinData
    // add new goal
    const coinData = {
      id: this.state.coinData.id,
      coinName: name,
      priceUsd: `${quotes.USD.price}`,
      coinTradePrice: this.props.coinTradePrice,
      coinQuantity: this.props.coinQuantity,
      coinTradeDate: this.state.tradeDate
    }
    this.props.addCoin(coinData);
    this.props.cancelHandler()
  }

  render() {
    if (this.state.coinData === null) {
      return null
    }
    let renderButton = (
      <Button
        containerViewStyle={styles.button}
        title="SUBMIT"
        onPress={this.submitForm}
      />
    )

    const { id, name, quotes, symbol } = this.state.coinData

    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text>Sorry there has been a network error</Text>
        </View>
      );
    }
    return (
      <ScrollView>
        <FormLabel>Coin Name</FormLabel>
        <FormInput
          containerStyle={this.state.error && styles.error}
          value={name}
          editable={false}
        />
        <FormLabel>Current Price (USD)</FormLabel>
        <FormInput
          containerStyle={this.state.error && styles.error}
          value={`${quotes.USD.price}`}
          editable={false}

        />

        <FormLabel>Buy Price</FormLabel>
        <FormInput
          containerStyle={this.stateError && stylesError}
          //value={this.props.coinTradePrice ?  `${this.props.coinTradePrice}` : `${quotes.USD.price}`}
          value={this.props.coinTradePrice}
          keyboardType='numeric'
          onChangeText={(val) => this.props.coinFormUpdate('coinTradePrice', val)}
          placeholder='Enter buy price'
          returnKeyType='done'
        />

        {this.state.coinTradePriceError && <FormValidationMessage>{this.state.coinTradePriceError}</FormValidationMessage>}
        <FormLabel>Quanity</FormLabel>
        <FormInput
          keyboardType='numeric'
          containerStyle={this.stateError && stylesError}
          value={this.props.coinQuantity}
          onChangeText={(val) => this.props.coinFormUpdate('coinQuantity', val)}
          placeholder='e.g. 10'
          returnKeyType='done'
        />

        {this.state.coinQuantityError && <FormValidationMessage>{this.state.coinQuantityError}</FormValidationMessage>}

        <FormLabel>Total Value</FormLabel>
        <FormInput
          keyboardType='numeric'
          containerStyle={this.stateError && stylesError}
          value={this.calculateTotalValue()}

        />



        <FormLabel>Trade Date</FormLabel>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.tradeDate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          //minDate="2016-05-01"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{

            dateInput: {
              marginLeft: 20
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => { this.setState({ tradeDate: date }) }}
        />

        {renderButton}
        <Button
          containerViewStyle={styles.button}
          title="CANCEL"
          onPress={this.props.cancelHandler}
        />

      </ScrollView>
    );
  }
}
const mapStateToProps = state => {

  return {
    //co  goals: state.coin.goals,
    coinTradePrice: state.userData.coinTradePrice,
    coinQuantity: state.userData.coinQuantity,
    coinTotalValue: state.userData.coinTotalValue,
    coinTradeDate: state.userData.coinTradeDate,
  }
};
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20
  }
});


//make this component available to the app
export default connect(mapStateToProps, { coinFormUpdate, addCoin })(AddCoin);
