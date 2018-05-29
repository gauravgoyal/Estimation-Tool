import { combineReducers } from 'redux'
import {
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_VIEWED,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS
} from '../actions'

function projectOperations(state = {
  isFetching: true,
  projectsList: {},
  viewedProjects: [],
  currProject: []
}, action) {
  switch (action.type) {
    case PROJECT_FETCH_REQUEST:
    return {
      ...state,
      isFetching: true
    }

    case PROJECT_FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      viewedProjects: [...state.viewedProjects, action.data],
      currProject: action.data
    }

    case PROJECT_UPDATE_REQUEST:
    return {
      ...state,
      isFetching: true
    }

    case PROJECT_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currProject: action.data
    }

    case PROJECT_LIST_REQUEST:
    return {
      ...state,
      isFetching: true
    }

    case PROJECT_LIST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      projectsList: action.data,
    }

    case PROJECT_VIEWED:
    return {
      ...state,
      viewedProjects: [...state.viewedProjects, action.data],
      currProject: action.data
    }
    default:
    return state
  }
}

const rootReducer = combineReducers({
  projectOperations
})

export default rootReducer
