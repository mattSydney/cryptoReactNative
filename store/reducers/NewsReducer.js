import {
    GET_NEWS_DATA,
    GET_NEWS_DATA_SUCCESS,
    GET_NEWS_DATA_FAIL
} from '../actions/Types'

const initialState = {
    isFetching: true,
    data: null,
    hasError: false,
    errorMessage: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_NEWS_DATA:
            return {...state, 
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            };
            
        case GET_NEWS_DATA_SUCCESS:
            return {...state, 
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            };

        case GET_NEWS_DATA_FAIL:
            return {...state, 
                isFetching: false,
                data: null,
                hasError: true,
                errorMessage: action.payload
            };
    
        default:
            return state;
    }
    
}