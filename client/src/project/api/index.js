import config from '../../config';

const ENDPOINT_PROJECT_DETAILS = config.api_url + 'projects';
const ENDPOINT_PROJECT_UPDATE = config.api_url + 'project/update/';
const ENDPOINT_PROJECT_RATES = config.api_url + 'rates/';
const ENDPOINT_PROJECT_RATES_UPDATE = config.api_url + 'rates/update/'
const ENDPOINT_PROJECT_RATE_CREATE = config.api_url + "rates"
const ENDPOINT_PROJECT_CREATE = config.api_url + "project"
const ENDPOINT_PROJECT_UFACTORS_CREATE = config.api_url + "factors"
const ENDPOINT_PROJECT_UFACTORS = config.api_url + 'factors/'
const ENDPOINT_PROJECT_UFACTORS_UPDATE = config.api_url + 'factors/update/'
const ENDPOINT_PROJECT_TASKS = config.api_url + 'tasks/'
const ENDPOINT_PROJECT_TASKS_UPDATE = config.api_url + 'tasks/update/'
const ENDPOINT_PROJECT_TOTAL_UPDATE = config.api_url + 'project-total/update/'

export const apiProjectUpdate = (project) => {
  let endpoint = ENDPOINT_PROJECT_UPDATE + project.pid
  return sendPostRequest(endpoint, project)
}

export const apiProjectTasksUpdate = (task) => {
  let endpoint = ENDPOINT_PROJECT_TASKS_UPDATE + task.pid
  return sendPostRequest(endpoint, task)
}

export const apiProjectTotalUpdate = (total) => {
  let endpoint = ENDPOINT_PROJECT_TOTAL_UPDATE + total.pid
  return sendPostRequest(endpoint, total)
}

export const apiListProjects = () => {
  return fetch(ENDPOINT_PROJECT_DETAILS)
}

export const apiFetchProject = (pid) => {
  return fetch(ENDPOINT_PROJECT_DETAILS + '/' + pid)
}

export const apiProjectRates = (pid) => {
  return fetch(ENDPOINT_PROJECT_RATES + pid)
}

export const apiProjectTasks = (pid) => {
  return fetch(ENDPOINT_PROJECT_TASKS + pid)
}

export const apiProjectRatesUpdate = (rate) => {
  let endpoint = ENDPOINT_PROJECT_RATES_UPDATE + rate.rid
  return sendPostRequest(endpoint, rate)
}

export const apiProjectRateCreate = (rate) => {
  return sendPostRequest(ENDPOINT_PROJECT_RATE_CREATE, rate)
}

export const apiProjectCreate = (project) => {
  return sendPostRequest(ENDPOINT_PROJECT_CREATE, project)
}

export const apiProjectUFactorsCreate = (uFactor) => {
  return sendPostRequest(ENDPOINT_PROJECT_UFACTORS_CREATE, uFactor)
}

export const apiProjectUFactors = (pid) => {
  return fetch(ENDPOINT_PROJECT_UFACTORS + pid)
}

export const apiProjectUFactorsUpdate = (uFactor) => {
  let endpoint = ENDPOINT_PROJECT_UFACTORS_UPDATE + uFactor.ufid
  return sendPostRequest(endpoint, uFactor)
}

const sendPostRequest = (endpoint, data) => {
  let formData = createFormData(data);
  return fetch(endpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData
  })
}

const createFormData = (data) => {
  var formData = new URLSearchParams();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}
