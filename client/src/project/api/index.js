import config from '../../config';

const ENDPOINT_PROJECT_DETAILS = config.api_url + 'projects';
const ENDPOINT_PROJECT_UPDATE = config.api_url + 'project/update/';

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

const createFormData = (data) => {
  var formData = new URLSearchParams();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}
