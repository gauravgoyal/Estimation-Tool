import { combineReducers } from 'redux'
import {
  PROJECT_FETCH_REQUEST,
  PROJECT_FETCH_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_VIEWED,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_RATE_REQUEST,
  PROJECT_RATE_SUCCESS,
  PROJECT_RATE_UPDATE_REQUEST,
  PROJECT_RATE_UPDATE_SUCCESS,
  PROJECT_RATE_CREATE_REQUEST,
  PROJECT_RATE_CREATE_SUCCESS,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS
} from '../actions'

function projectOperations(state = {
  isFetching: true,
  projectsList: {},
  viewedProjects: [],
  currProject: []
}, action) {
  switch (action.type) {
    case PROJECT_FETCH_REQUEST:
    case PROJECT_CREATE_REQUEST:
    case PROJECT_UPDATE_REQUEST:
    case PROJECT_LIST_REQUEST:
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

    case PROJECT_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currProject: action.data
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

    case PROJECT_CREATE_SUCCESS:
    return {
      ...state,
      currProject: action.data,
      viewedProjects: [...state.viewedProjects, action.data],
      projectsList: [...state.projectsList, action.data]
    }
    default:
    return state
  }
}

function projectRates(state = {
  isFetching: true,
  projectRates: [],
 }, action) {
  switch (action.type) {
    case PROJECT_RATE_REQUEST:
    case PROJECT_RATE_UPDATE_REQUEST:
    case PROJECT_RATE_CREATE_REQUEST:
    return {
      ...state,
      isFetching: true
    }

    case PROJECT_RATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      projectRates: action.data
    }

    case PROJECT_RATE_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      projectRates: action.data
    }

    case PROJECT_RATE_CREATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      projectRates: action.data
    }

    default:
    return state
  }

}

const rootReducer = combineReducers({
  projectOperations,
  projectRates
})

export default rootReducer
