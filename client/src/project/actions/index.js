import {
  apiListProjects,
  apiFetchProject,
  apiProjectUpdate
} from '../api';
export const PROJECT_FETCH_REQUEST = 'PROJECT_FETCH_REQUEST'
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS'
export const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST'
export const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS'
export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST'
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS'
export const PROJECT_VIEWED = 'PROJECT_VIEWED'

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

const projectUpdateSuccess = (project) => ({
  type: PROJECT_UPDATE_SUCCESS,
  data: project
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
