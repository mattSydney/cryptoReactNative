import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { images } from '../constants/Icons';
import Helper from '../utils/Helper';


const NewsCard = ({ title, description, url, publishedAt, urlToImage,onNewsPressedHandler }) => {    
    return (
        <TouchableOpacity onPress={() => onNewsPressedHandler(url) }style={container}>
            <View style={upperRow}>
                <Image
                    style={styles.image}
                    source={{ uri: urlToImage }}
                />
                <View style={newsView}>
                <Text style={titleText}>{title}</Text>
                <Text style={descriptionText}>{Helper.trim(description,100)}</Text>
                </View>
            </View>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 20
    },
    upperRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15
    },
    newsView:{
        marginLeft:15,
        width:250,
        
    },
    titleText:{
        fontSize:14,
        marginBottom:12,
        fontWeight: 'bold'
    },
    descriptionText:{
        fontSize:12,
        opacity:.7
    },
    seperator: {
        marginTop: 10,
    },
   
    image: {
        width: 75,
        height: 75,
    },
 
})

const { 
    container,
    image,
    moneySymbol,
    upperRow,
    newsView,
    titleText,
    descriptionText,
    seperator,
    
} = styles;

export default NewsCard;