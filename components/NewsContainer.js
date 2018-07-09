import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, FlatList } from 'react-native';
import FetchNewsData from '../store/actions/NewsActions';
import NewsCard from './NewsCard';
import Spinner from 'react-native-loading-spinner-overlay';
import { Heading } from '@shoutem/ui';

class NewsContainer extends Component {

    state = { inWebView: false }

    componentDidMount() {
        this.props.FetchNewsData();
        //console.log(this.props)
        //this.props.navigation.setParams({title: 'Updated!'})
    }

    onNewsPressedHandler = (url) => {
        //console.log(url)
        //this.setState({inWebView: true})
        this.props.navigation.navigate('NewsWeb', {url})
    }
    renderNewsCards() {
        const { news } = this.props;
        //console.log(news.data.articles)
        return (
            <FlatList
                data={news.data.articles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>

                    <NewsCard
                        key={item.title}
                        title={item.title}
                        author={item.author}
                        publishedAt={item.publishedAt}
                        url={item.url}
                        urlToImage={item.urlToImage}
                        description={item.description}
                        onNewsPressedHandler={this.onNewsPressedHandler}
                    />
                }
            />
        )
    }
    render() {

        const { news } = this.props;
        const { contentContainer } = styles;
        const {inWebView} = this.state;
        if (news.isFetching) {
            return (
                <View>
                    <Spinner
                        visible={news.isFetching}
                        textContent={"Loading..."}
                        textStyle={{ color: '#253145' }}
                        animation="fade"
                    />
                </View>
            )
        }
        if (news.hasError) {
            return (
                <ScrollView contentContainerStyle={contentContainer}>                
                    <Heading>Sorry we cannot connect to server at this time. Please try again later</Heading>
                </ScrollView>
            )
        }
        if (inWebView) {
            return (
                <WebView
                source={{uri: 'https://www.google.co.uk'}}
                style={{marginTop: 20}}
              />
            )
        }
        return (
            this.renderNewsCards()
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
        news: state.news
    }
}

export default connect(mapStateToProps, { FetchNewsData })(NewsContainer)