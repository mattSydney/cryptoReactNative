import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList, Alert } from 'react-native';
import { FetchUserAndCoinData } from '../store/actions/CoinActions';
import { deleteCoin } from '../store/actions/UserDataActions';
import Card from './Card';
import Spinner from 'react-native-loading-spinner-overlay';
import { Heading } from '@shoutem/ui';
import CardPortfolio from './CardPortfolio';
import axios from 'axios';
import { coinAPIURL } from '../constants/Constants';
class PortfolioContainer extends Component {
    state = { userCoinData: [] }
    
    componentDidMount() {
        this.props.FetchUserAndCoinData(this.props.userData.coins)
    }

    componentWillReceiveProps(nextProps) {
        // force refresh if data changes
        if (this.props.userData.coins.length !== nextProps.userData.coins.length) {
            this.props.FetchUserAndCoinData(nextProps.userData.coins)
        }
    }
    
    onDeleteHandler = (indexToDelete) => {
        Alert.alert(
            'Are You Sure?',
            'Delete',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.doDeleteCoin(indexToDelete) },
            ],
            { cancelable: false }
        )
    }

    doDeleteCoin(indexToDelete) {
        let newGoals = this.props.userData.coins.filter((goal, index) => {
            if (index != indexToDelete) {
                return goal;
            }
        })
        console.log(this)
        this.props.deleteCoin(newGoals);
        // this.getCoinAndUserData()
    }

    renderCoinCards() {
        //this.getCoinAndUserData()
        const { crypto, coins } = this.props;

        console.log(this.props.crypto.userCoinData)

        return (
            <FlatList
                data={this.props.crypto.userCoinData}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item, index }) =>
                    <CardPortfolio
                        index={index}
                        id={item.key}
                        coin_name={item.name}
                        symbol={item.symbol}
                        price_usd={item.quotes.USD.price}
                        percent_change_24h={item.percent_change_24h}
                        percent_change_7d={item.percent_change_7d}
                        coinTradePrice={item.coinTradePrice}
                        coinQuantity={item.coinQuantity}
                        coinTradeDate={item.coinTradeDate}
                        onDeleteHandler={this.onDeleteHandler}
                    />
                }
            />
        )
    }
    render() {
        const { crypto } = this.props;
        const { contentContainer } = styles;
        if (crypto.isFetching) {
            return (
                <View>
                    <Spinner
                        visible={crypto.isFetching}
                        textContent={"Loading..."}
                        textStyle={{ color: '#253145' }}
                        animation="fade"
                    />
                </View>
            )
        }
        if (crypto.hasError) {
            return (
                <ScrollView contentContainerStyle={contentContainer}>
                    <Heading>Sorry we cannot connect to server at this time. Please try again later</Heading>
                </ScrollView>
            )
        }
        return (
            this.renderCoinCards()
        )
    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 55
    }
}

function mapStateToProps(state) {
    return {
        crypto: state.crypto,
        userData: state.userData
    }
}

export default connect(mapStateToProps, { deleteCoin, FetchUserAndCoinData })(PortfolioContainer)