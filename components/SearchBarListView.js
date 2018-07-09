import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { coinAPIURL } from '../constants/Constants';
export default class SearchBarListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            error: null
        }
        this.arrayholder = [];
    }

    componentDidMount() {        
        return fetch(`${coinAPIURL}/v2/listings`)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });             
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.data),
                }, function () {                    
                    this.arrayholder = responseJson.data;
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

  
    SearchFilterFunction(text) {
        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.MainContainer}>
                <TextInput
                    style={styles.TextInputStyleClass}
                    onChangeText={(text) => this.SearchFilterFunction(text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="Search Here"
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text style={styles.rowViewContainer}
                    onPress={()=>this.props.onCoinPickedHandler(rowData.id)} >{rowData.name}</Text>}
                    enableEmptySections={true}
                    style={{ marginTop: 10 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 7,

    },
    rowViewContainer: {
        fontSize: 17,
        padding: 10
    },
    TextInputStyleClass: {

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"
    }
});