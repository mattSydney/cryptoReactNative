import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import {FetchCoinData} from '../store/actions/CoinActions';
import Card from './Card';
import Spinner from 'react-native-loading-spinner-overlay';
import { Heading } from '@shoutem/ui';

class CoinContainer extends Component {
    
    componentDidMount() {
        this.props.FetchCoinData();
    }

    renderCoinCards() {
        const { crypto } = this.props;
        return (
        <FlatList
            data={crypto.data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item}) =>
            <Card
                    key={item.name}
                    coin_name={item.name}
                    symbol={item.symbol}
                    price_usd={item.price_usd}
                    percent_change_24h={item.percent_change_24h}
                    percent_change_7d={item.percent_change_7d}                    
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
        if(crypto.hasError) {
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
    //console.log(state)
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, { FetchCoinData })(CoinContainer)