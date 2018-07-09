
import  {
  ADD_GOAL_DONE, 
  ADD_GOAL_FIELD_UPDATE, 
  ADD_GOAL_FAIL, GET_GOAL, 
  SET_GOAL_FROM_STORAGE,
  INCREASE_GOAL_COMPLETION_VALUE,
  DELETE_GOAL
}  
  from './Types';
import { NavigationActions } from 'react-navigation'

export const addGoal = (goal) => {
  return (dispatch) => {
  dispatch(NavigationActions.navigate({ routeName: 'Main' }));
  dispatch( {
    type: ADD_GOAL_DONE,
    goal: goal
  })
}
}

export const goalFormUpdate = (prop, value) => {
  return {
    type: ADD_GOAL_FIELD_UPDATE,
    payload: {prop, value}
  }
}

export const setAllGoals = (goals) => {
  return {
    type: SET_GOAL_FROM_STORAGE,
    payload: goals
  }
}

export const increaseCompletionValue = (goals) => {
  return {
    type: INCREASE_GOAL_COMPLETION_VALUE,
    payload: goals
  }
}
export const deleteGoal = (goals) => {
  return {
    type: DELETE_GOAL,
    payload: goals
  }
}
