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
  PROJECT_CREATE_SUCCESS,
  PROJECT_UFACTOR_REQUEST,
  PROJECT_UFACTOR_SUCCESS,
  PROJECT_UFACTOR_UPDATE_REQUEST,
  PROJECT_UFACTOR_UPDATE_SUCCESS,
  PROJECT_UFACTOR_CREATE_REQUEST,
  PROJECT_UFACTOR_CREATE_SUCCESS,
  PROJECT_TASKS_FETCH_REQUEST,
  PROJECT_TASKS_FETCH_SUCCESS,
  PROJECT_TASKS_UPDATE_REQUEST,
  PROJECT_TASKS_UPDATE_SUCCESS,
  PROJECT_TOTAL_UPDATE_REQUEST,
  PROJECT_TOTAL_UPDATE_SUCCESS,
  PROJECT_TOTAL_FETCH_REQUEST,
  PROJECT_TOTAL_FETCH_SUCCESS,
  PROJECT_TASKS_CREATE_REQUEST,
  PROJECT_TASKS_CREATE_SUCCESS,
  PROJECT_RESOURCE_PLAN_CREATE_REQUEST,
  PROJECT_RESOURCE_PLAN_CREATE_SUCCESS,
  PROJECT_RESOURCE_PLAN_FETCH_REQUEST,
  PROJECT_RESOURCE_PLAN_FETCH_SUCCESS,
  PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_REQUEST,
  PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_SUCCESS,
  PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_REQUEST,
  PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_SUCCESS,
  PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_REQUEST,
  PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_SUCCESS,
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
    case PROJECT_RATE_CREATE_SUCCESS:
    case PROJECT_RATE_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      projectRates: action.data
    }

    default:
    return state
  }

}

function projectUFactors(state = {
  isFetching: true,
  projectUFactors: [],
 }, action) {
  switch (action.type) {
    case PROJECT_UFACTOR_REQUEST:
    case PROJECT_UFACTOR_UPDATE_REQUEST:
    case PROJECT_UFACTOR_CREATE_REQUEST:
    return {
      ...state,
      isFetching: true
    }

    case PROJECT_UFACTOR_SUCCESS:
    case PROJECT_UFACTOR_CREATE_SUCCESS:
    case PROJECT_UFACTOR_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      projectUFactors: action.data
    }

    default:
    return state
  }

}

function projectTasks(state = {
  isFetching: true,
  inValidate: false,
  projectTasks: [],
  projectTotal: [],
}, action) {
  switch (action.type) {
    case PROJECT_TASKS_FETCH_REQUEST:
    case PROJECT_TASKS_UPDATE_REQUEST:
    case PROJECT_TOTAL_UPDATE_REQUEST:
    case PROJECT_TOTAL_FETCH_REQUEST:
    case PROJECT_TASKS_CREATE_REQUEST:
    return {
      ...state,
      isFetching: true,
      inValidate: false,
    }

    case PROJECT_TASKS_FETCH_SUCCESS:
    case PROJECT_TASKS_CREATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      inValidate: true,
      projectTasks: action.data
    }

    case PROJECT_TASKS_UPDATE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      inValidate: true,
      projectTasks: action.data
    }

    case PROJECT_TOTAL_UPDATE_SUCCESS:
    case PROJECT_TOTAL_FETCH_SUCCESS:
    return {
      ...state,
      isFetching: false,
      inValidate: true,
      projectTotal: action.data
    }

    default:
    return state
  }
}

function projectResourcePlans(state = {
  isFetchingResources: false,
  currPlan: [],
  resourcePlans: [],
  currResId: '',
}, action) {
  switch(action.type) {
    case PROJECT_RESOURCE_PLAN_CREATE_REQUEST:
    case PROJECT_RESOURCE_PLAN_FETCH_REQUEST:
    case PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_REQUEST:
    case PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_REQUEST:
    case PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_REQUEST:
    return {
      ...state,
      isFetchingResources: true
    }

    case PROJECT_RESOURCE_PLAN_CREATE_SUCCESS:
    case PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_SUCCESS:
    return {
      ...state,
      isFetchingResources: false,
      currPlan: action.data,
      currResId: action.resId
    }

    case PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_SUCCESS:
    return {
      ...state,
      isFetchingResources: false,
      currResId: action.resId,
      currPlan: [...state.currPlan, action.data]
    }

    case PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_SUCCESS:
    return {
      ...state,
      isFetchingResources: false,
      currResId: action.resId
    }

    case PROJECT_RESOURCE_PLAN_FETCH_SUCCESS:
    return {
      ...state,
      isFetchingResources: false,
      resourcePlans: action.data,
    }

    default:
    return state
  }
}

const rootReducer = combineReducers({
  projectOperations,
  projectRates,
  projectUFactors,
  projectTasks,
  projectResourcePlans
})

export default rootReducer
