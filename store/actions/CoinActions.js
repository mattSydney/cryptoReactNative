import axios from 'axios';
import { coinAPIURL } from '../../constants/Constants';
import {
    GET_COIN_DATA,
    GET_COIN_DATA_SUCCESS,
    GET_COIN_DATA_FAIL,
    GET_COIN_AND_USER_FROM_STORAGE,
    GET_COIN_AND_USER_FROM_STORAGE_SUCCESS,
    GET_COIN_AND_USER_FROM_STORAGE_FAIL
} from './Types';


export  const FetchCoinData = () => {
    return dispatch => {
        dispatch({ type: GET_COIN_DATA })        
        return axios.get(`${coinAPIURL}/v1/ticker/?limit=100`)
            .then(result => {
                dispatch({ type: GET_COIN_DATA_SUCCESS, payload: result.data })
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_COIN_DATA_FAIL, payload: err })
            });
    }
}

export  const FetchUserAndCoinData = (coins) =>  {
    return dispatch => {
        dispatch({ type: GET_COIN_AND_USER_FROM_STORAGE })                          
        let promiseArray = coins.map( coin=> axios.get(`${coinAPIURL}/v2/ticker/${coin.id}`));        
                
       return axios.all(promiseArray)
          .then(result =>  {
            //... but this callback will be executed only when both requests are complete.
            const data = result.map(r => r.data.data);            
            const flatListData = data.map(coin => {
                coins.forEach(c => {
                    if(c.id === coin.id) {              
                        coin.coinQuantity = c.coinQuantity
                        coin.coinTradePrice = c.coinTradePrice
                        coin.coinTradeDate = c.coinTradeDate                                                
                    }                    
                });
                return coin
            })            
            dispatch({ type: GET_COIN_AND_USER_FROM_STORAGE_SUCCESS, payload: flatListData})               
          });  
    }
}
