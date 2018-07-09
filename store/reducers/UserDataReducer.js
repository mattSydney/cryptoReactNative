import {
    ADD_COIN_DONE,
    ADD_COIN_FIELD_UPDATE,
    ADD_COIN_FAIL, GET_COIN,
    SET_COIN_FROM_STORAGE,
    INCREASE_COIN_COMPLETION_VALUE,
    DELETE_COIN
}
    from '../actions/Types';
//import { REHYDRATE } from 'redux-persist/es/constants';
const initialAuthState = {
    coins: [       
    ],
    coinTradePrice: '',
    coinQuantity: '',
    coinTotalValue: '',
    coinTradeDate: '',

    coinAdded: null,
    addCoinScreen: true
}
// here we return a new state to the page
export default (state = initialAuthState, action) => {

    switch (action.type) {
        case ADD_COIN_DONE:
            return { ...state, coins: [...state.coins, action.payload], 
                coinAdded: true,coinDescription: null, coinReason: null, coinCompletionValue: null,coinTradePrice: '', coinQuantity: ''};
        case ADD_COIN_FIELD_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SET_COIN_FROM_STORAGE:
            return { ...state, coins: action.payload };
        case INCREASE_COIN_COMPLETION_VALUE:
            return { ...state, coins: action.payload };
        case DELETE_COIN:
            return { ...state, coins: action.payload };
        default:
            return state;
    }
}