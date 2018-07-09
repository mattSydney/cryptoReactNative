
import  {
    ADD_COIN_DONE, 
    ADD_COIN_FIELD_UPDATE, 
    ADD_COIN_FAIL, GET_COIN, 
    SET_COIN_FROM_STORAGE,
    DELETE_COIN
  }  
    from './Types';
  import { NavigationActions } from 'react-navigation'
  
  export const addCoin = (coin) => {
    return (dispatch) => {
    //dispatch(NavigationActions.navigate({ routeName: 'PortfolioStack' }));
    console.log("NAV")
    dispatch( {
      type: ADD_COIN_DONE,
      payload: coin
    })
  }
  }
  
  export const coinFormUpdate = (prop, value) => {
    return {
      type: ADD_COIN_FIELD_UPDATE,
      payload: {prop, value}
    }
  }
  
  export const setAllCoins = (coins) => {
    return {
      type: SET_COIN_FROM_STORAGE,
      payload: coins
    }
  }
  
  export const increaseCompletionValue = (coins) => {
    return {
      type: INCREASE_COIN_COMPLETION_VALUE,
      payload: coins
    }
  }
  export const deleteCoin = (coins) => {
    return {
      type: DELETE_COIN,
      payload: coins
    }
  }