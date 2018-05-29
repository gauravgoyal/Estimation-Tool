import config from '../../config';

const ENDPOINT_PROJECT_DETAILS = config.api_url + 'projects';
const ENDPOINT_PROJECT_UPDATE = config.api_url + 'project/update/';
const ENDPOINT_PROJECT_RATES = config.api_url + 'rates/';
const ENDPOINT_PROJECT_RATES_UPDATE = config.api_url + 'rates/update/'
const ENDPOINT_PROJECT_RATE_CREATE = config.api_url + "rates"

export const apiProjectUpdate = (project) => {
  let formData = createFormData(project);
  return fetch(ENDPOINT_PROJECT_UPDATE + project.pid, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData
  })
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
  let formData = createFormData(rate);
  return fetch(ENDPOINT_PROJECT_RATES_UPDATE + rate.rid, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData
  })
}

export const apiProjectRateCreate = (rate) => {
  let formData = createFormData(rate);
  return fetch(ENDPOINT_PROJECT_RATE_CREATE, {
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
