import config from '../../config';

const ENDPOINT_PROJECT_DETAILS = config.api_url + 'projects';
const ENDPOINT_PROJECT_UPDATE = config.api_url + 'project/update/';
const ENDPOINT_PROJECT_RATES = config.api_url + 'rates/';
const ENDPOINT_PROJECT_RATES_UPDATE = config.api_url + 'rates/update/'
const ENDPOINT_PROJECT_RATE_CREATE = config.api_url + "rates"
const ENDPOINT_PROJECT_CREATE = config.api_url + "project"
const ENDPOINT_PROJECT_UFACTORS_CREATE = config.api_url + "factors"

export const apiProjectUpdate = (project) => {
  let endpoint = ENDPOINT_PROJECT_UPDATE + project.pid
  return sendPostRequest(endpoint, project)
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
