import axios from 'axios';
import { newsUrl } from '../../constants/Constants';
import {
    GET_NEWS_DATA,
    GET_NEWS_DATA_SUCCESS,
    GET_NEWS_DATA_FAIL
} from './Types';


export default function FetchNewsData() {
    return dispatch => {

        dispatch({ type: GET_NEWS_DATA })
        
        return axios.get(newsUrl)
            .then(result => {
                dispatch({ type: GET_NEWS_DATA_SUCCESS, payload: result.data })
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_NEWS_DATA_FAIL, payload: err })
            });
    }
}