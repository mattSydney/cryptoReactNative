import {
    GET_COIN_DATA,
    GET_COIN_DATA_SUCCESS,
    GET_COIN_DATA_FAIL,
    GET_COIN_AND_USER_FROM_STORAGE,
    GET_COIN_AND_USER_FROM_STORAGE_SUCCESS,
    GET_COIN_AND_USER_FROM_STORAGE_FAIL
} from '../actions/Types'

const initialState = {
    isFetching: true,
    data: [],
    userCoinData: [],
    hasError: false,
    errorMessage: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case GET_COIN_DATA:
            return {
                ...state,
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            };

        case GET_COIN_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            };

        case GET_COIN_DATA_FAIL:
            return {
                ...state,
                isFetching: false,
                data: null,
                hasError: true,
                errorMessage: action.payload
            };
        case GET_COIN_AND_USER_FROM_STORAGE:
            return {
                ...state,
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            };

        case GET_COIN_AND_USER_FROM_STORAGE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userCoinData: action.payload,
                hasError: false,
                errorMessage: null
            };

        case GET_COIN_AND_USER_FROM_STORAGE_FAIL:
            return {
                ...state,
                isFetching: false,
                data: null,
                hasError: true,
                errorMessage: action.payload
            };

        default:
            return state;
    }

}