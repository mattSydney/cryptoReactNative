import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { images } from '../constants/Icons';
import { Icon } from 'react-native-elements'

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}
const newDate = (theDate) => {

    var dt = new Date(theDate);
    return dt.toLocaleDateString("en-GB");
}


const CardPortfolio = ({ symbol, coin_name, price_usd, percent_change_24h, percent_change_7d, coinTradePrice, coinQuantity, coinTradeDate, onDeleteHandler, index }) => {

    

    return (
        <View style={container}>
            <View style={upperRow}>
                <Image
                    style={styles.image}
                    source={{ uri: images[symbol] }}
                />
                <Text style={coinSymbol}>{symbol}</Text>
                <Text style={seperator}>|</Text>
                <Text style={coinName}>{coin_name}</Text>
                <Text style={coinPrice}>Market : ${price_usd}
                    <Text style={moneySymbol}>  </Text>
                </Text>
            </View>

            <View style={statisticsContainer}>
                <Text style={dataBlock}>Quanity:
                     <Text style={percentChangePlus}> {coinQuantity}  </Text>
                </Text>
                <Text style={dataBlock}>Paid:
                    <Text style={percent_change_7d < 0 ? percentChangeMinus : percentChangePlus}> ${coinTradePrice}   </Text>
                </Text>
                <Text style={dataBlock}>Total:
                    <Text style={percent_change_7d < 0 ? percentChangeMinus : percentChangePlus}> ${coinTradePrice * coinQuantity}    </Text>
                </Text>
            </View>

            <View style={statisticsContainer}>
                <Text style={dataBlock}>Trade Date:
                    <Text style={percent_change_24h < 0 ? percentChangeMinus : percentChangePlus}> {newDate(coinTradeDate)} </Text>
                </Text>
                
              
                <Text style={{alignItems:'flex-end'}}>Profit/loss:
                     <Text style={((price_usd * coinQuantity) - (coinTradePrice * coinQuantity)).toFixed(2)  < 0 ? percentChangeMinus : percentChangePlus}> $ {((price_usd * coinQuantity) - (coinTradePrice * coinQuantity)).toFixed(2) }    </Text>
                </Text>
            </View>

            <View style={buttonsContainer}>
                <TouchableOpacity onPress={() => onDeleteHandler(index)}>
                    <Icon
                        name='delete' />
                </ TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 10
    },
    upperRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15,

    },
    coinSymbol: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: "bold",
    },
    coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20
    },
    seperator: {
        marginTop: 10,
    },
    coinPrice: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 10,
        fontWeight: "bold",
    },
    image: {
        width: 35,
        height: 35,
    },
    moneySymbol: {
        fontWeight: "bold",
    },
    statisticsContainer: {
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 0
    },
    Container: {
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderWidth: 1
    },
    buttonsContainer: {
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    percentChangePlus: {
        color: "#00BFA5",
        fontWeight: "bold",
        marginLeft: 5
    },
    percentChangeMinus: {
        color: "#DD2C00",
        fontWeight: "bold",
        marginLeft: 5
    },
    dataBlock: { flex: 1 }
})

const {
    container,
    image,
    moneySymbol,
    upperRow,
    coinSymbol,
    coinName,
    coinPrice,
    statisticsContainer,
    seperator,
    percentChangePlus,
    percentChangeMinus,
    buttonsContainer,
    dataBlock
} = styles;

export default CardPortfolio;