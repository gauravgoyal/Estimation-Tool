import {
  apiListProjects,
  apiFetchProject,
  apiProjectUpdate,
  apiProjectRates,
  apiProjectRatesUpdate,
  apiProjectRateCreate,
  apiProjectCreate,
  apiProjectUFactorsCreate,
  apiProjectUFactors,
  apiProjectUFactorsUpdate
} from '../api';

export const PROJECT_FETCH_REQUEST = 'PROJECT_FETCH_REQUEST'
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS'
export const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST'
export const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS'
export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST'
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS'
export const PROJECT_CREATE_REQUEST = 'PROJECT_CREATE_REQUEST'
export const PROJECT_CREATE_SUCCESS = 'PROJECT_CREATE_SUCCESS'
export const PROJECT_VIEWED = 'PROJECT_VIEWED'
export const PROJECT_RATE_REQUEST = 'PROJECT_RATE_REQUEST'
export const PROJECT_RATE_SUCCESS = 'PROJECT_RATE_SUCCESS'
export const PROJECT_RATE_UPDATE_REQUEST = 'PROJECT_RATE_REQUEST'
export const PROJECT_RATE_UPDATE_SUCCESS = 'PROJECT_RATE_SUCCESS'
export const PROJECT_RATE_CREATE_REQUEST = 'PROJECT_RATE_CREATE_REQUEST'
export const PROJECT_RATE_CREATE_SUCCESS = 'PROJECT_RATE_CREATE_SUCCESS'
export const PROJECT_UFACTOR_REQUEST = 'PROJECT_UFACTOR_REQUEST'
export const PROJECT_UFACTOR_SUCCESS = 'PROJECT_UFACTOR_SUCCESS'
export const PROJECT_UFACTOR_UPDATE_REQUEST = 'PROJECT_UFACTOR_UPDATE_REQUEST'
export const PROJECT_UFACTOR_UPDATE_SUCCESS = 'PROJECT_UFACTOR_UPDATE_SUCCESS'
export const PROJECT_UFACTOR_CREATE_REQUEST = 'PROJECT_UFACTOR_CREATE_REQUEST'
export const PROJECT_UFACTOR_CREATE_SUCCESS = 'PROJECT_UFACTOR_CREATE_SUCCESS'

const sendProjectFetchRequest = () => ({
  type: PROJECT_FETCH_REQUEST
})

const projectFetchSuccess = (project) => ({
  type: PROJECT_FETCH_SUCCESS,
  data: project
})

const sendProjectUpdateRequest = () => ({
  type: PROJECT_UPDATE_REQUEST
})

const listProjectsRequest = () => ({
  type: PROJECT_LIST_REQUEST
})

const listProjectsSuccess = (json) => ({
  type: PROJECT_LIST_SUCCESS,
  data: json
})

const sendProjectCreateRequest = () => ({
  type: PROJECT_CREATE_REQUEST
})

const projectCreateSuccess = (json) => ({
  type: PROJECT_CREATE_SUCCESS,
  data: json
})

const projectUpdateSuccess = (project) => ({
  type: PROJECT_UPDATE_SUCCESS,
  data: project
})

const sendProjectRateRequest = () => ({
  type: PROJECT_RATE_REQUEST
})

const projectRateSuccess = (rates) => ({
  type: PROJECT_RATE_SUCCESS,
  data: rates
})

const sendProjectUfactorRequest = () => ({
  type: PROJECT_UFACTOR_CREATE_REQUEST
})

const projectUfactorSuccess = (uFactors) => ({
  type: PROJECT_UFACTOR_CREATE_SUCCESS,
  data: uFactors
})

const sendProjectRateUpdateRequest = () => ({
  type: PROJECT_RATE_UPDATE_REQUEST
})

const projectRateUpdateSuccess = (rates) => ({
  type: PROJECT_RATE_UPDATE_SUCCESS,
  data: rates
})

const sendProjectUfactorsUpdateRequest = () => ({
  type: PROJECT_UFACTOR_UPDATE_REQUEST
})

const projectUfactorsUpdateSuccess = (ufactors) => ({
  type: PROJECT_UFACTOR_UPDATE_SUCCESS,
  data: ufactors
})

const sendProjectRateCreateRequest = () => ({
  type: PROJECT_RATE_CREATE_REQUEST
})

const sendProjectRateCreateSuccess = (rate) => ({
  type: PROJECT_RATE_CREATE_SUCCESS,
  data: rate
})

const projectUFactorsRequest = () => ({
  type: PROJECT_UFACTOR_REQUEST
})

const projectUFactorsSuccess = (uFactors) => ({
  type: PROJECT_UFACTOR_SUCCESS,
  data: uFactors
})

export const viewedProjects = (project) => ({
  type: PROJECT_VIEWED,
  data: project
})

export const updateProjectDetails = (project) => (dispatch) => {
  dispatch(sendProjectUpdateRequest())
  return (apiProjectUpdate(project))
  .then(res => res.json())
  .then(json => dispatch(projectUpdateSuccess(project)))
}

export const listProjects = () => (dispatch) => {
  dispatch(listProjectsRequest())
  return apiListProjects()
  .then(res => res.json())
  .then(json => dispatch(listProjectsSuccess(json)))
}

export const fetchProject = (pid) => (dispatch) => {
  dispatch(sendProjectFetchRequest())
  return apiFetchProject(pid)
  .then(res => res.json())
  .then(json => dispatch(projectFetchSuccess(json.result.pop())))
}

export const fetchProjectRates = (pid) => (dispatch) => {
  dispatch(sendProjectRateRequest())
  return apiProjectRates(pid)
  .then(res => res.json())
  .then(json => dispatch(projectRateSuccess(json)))
}

export const updateProjectRates = (item, rates) => (dispatch) => {
  dispatch(sendProjectRateUpdateRequest())
  return apiProjectRatesUpdate(item)
  .then(res => res.json())
  .then(json => dispatch(projectRateUpdateSuccess(rates)))
}

export const addProjectRate = (rate, rates) => (dispatch) => {
  dispatch(sendProjectRateCreateRequest());
  return apiProjectRateCreate(rate)
  .then(res => res.json())
  .then(json => dispatch(sendProjectRateCreateSuccess(rates)))
}

export const addProject = (project, defaultRates, defaultUFactors) => (dispatch) => {
  dispatch(sendProjectCreateRequest());
  return apiProjectCreate(project)
  .then(res => res.json())
  .then(json => {
    let pid = json.result.pop()
    project.pid = pid;
    defaultRates.map((defaultRate) => {
      defaultRate.pid = pid
      return apiProjectRateCreate(defaultRate)
    })
    defaultUFactors.map((defaultUFactor) => {
      defaultUFactor.pid = pid
      return apiProjectUFactorsCreate(defaultUFactor)
    })
    dispatch(projectCreateSuccess(project))
  })
}

export const fetchProjectUfactors = (pid) => (dispatch) => {
  dispatch(projectUFactorsRequest());
  return apiProjectUFactors(pid)
  .then(res => res.json())
  .then(json => dispatch(projectUFactorsSuccess(json)))
}

export const updateProjectUfactors = (uFactor, uFactors) => (dispatch) => {
  dispatch(sendProjectUfactorsUpdateRequest())
  return apiProjectUFactorsUpdate(uFactor)
  .then(res => res.json())
  .then(json => dispatch(projectUfactorsUpdateSuccess(uFactors)))
}

export const addProjectUFactors = (uFactor, uFactors) => (dispatch) => {
  dispatch(sendProjectUfactorRequest());
  return apiProjectUFactorsCreate(uFactor)
  .then(res => res.json())
  .then(json => dispatch(projectUfactorSuccess(uFactors)))
}
