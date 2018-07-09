import { combineReducers } from 'redux';
import CoinReducer from './CoinReducer';
import NewsReducer from './NewsReducer';
import GoalReducer from './GoalReducer';
import UserDataReducer from './UserDataReducer';
export default combineReducers({
    crypto: CoinReducer,
    news: NewsReducer,
    goal: GoalReducer,
    userData: UserDataReducer
});