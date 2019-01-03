import config from '../../config';

const ENDPOINT_PROJECT_DETAILS = `${config.api_url}projects`;
const ENDPOINT_PROJECT_UPDATE = `${config.api_url}project/update/`;
const ENDPOINT_PROJECT_RATES = `${config.api_url}rates/`;
const ENDPOINT_PROJECT_RATES_UPDATE = `${config.api_url}rates/update/`;
const ENDPOINT_PROJECT_RATE_CREATE = `${config.api_url}rates`;
const ENDPOINT_PROJECT_CREATE = `${config.api_url}project`;
const ENDPOINT_PROJECT_UFACTORS_CREATE = `${config.api_url}factors`;
const ENDPOINT_PROJECT_UFACTORS = `${config.api_url}factors/`;
const ENDPOINT_PROJECT_UFACTORS_UPDATE = `${config.api_url}factors/update/`;
const ENDPOINT_PROJECT_TASKS = `${config.api_url}tasks/`;
const ENDPOINT_PROJECT_TASKS_UPDATE = `${config.api_url}tasks/update/`;
const ENDPOINT_PROJECT_TOTAL_UPDATE = `${config.api_url}project-total/update/`;
const ENDPOINT_PROJECT_TASKS_CREATE = `${config.api_url}tasks`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_FETCH = `${config.api_url}resource-plans/`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_CREATE = `${config.api_url}resource-plan/create`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_UPDATE = `${config.api_url}resource-plan/update/`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_ADD_ALLOCATIONS = `${config.api_url}resource-plan/allocation/add/`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_FETCH_ALLOCATIONS = `${config.api_url}resource-plan/allocation/fetch/`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_UPDATE_ALLOCATION = `${config.api_url}resource-plan/allocation/update`;
const ENDPOINT_PROJECT_RESOURCE_PLAN_REMOVE_WEEK_ALLOCATION = `${config.api_url}resource-plan/allocation/remove/`;
const ENDPOINT_GLOBAL_PROJECT_RATE_CREATE = `${config.api_url}global_rates_create`;
const ENDPOINT_PROJECT_RATES_FETCH = `${config.api_url}global-rate`;
const ENDPOINT_GLOBAL_RATES_UPDATE = `${config.api_url}global-rate/update/`;

export const apiProjectResourcePlanRemoveWeek = (resID, week) => {
  const endpoint = `${ENDPOINT_PROJECT_RESOURCE_PLAN_REMOVE_WEEK_ALLOCATION + resID}/${week}`;
  return sendPostRequest(endpoint);
};

export const apiProjectResourcePlanUpdate = (resourcePlan, resID) => {
  const endpoint = ENDPOINT_PROJECT_RESOURCE_PLAN_UPDATE + resID;
  return sendPostRequest(endpoint, resourcePlan);
};

export const apiProjectResourcePlanAllocationUpdate = (allocation) => {
  const endpoint = ENDPOINT_PROJECT_RESOURCE_PLAN_UPDATE_ALLOCATION;
  return sendPostRequest(endpoint, allocation);
};

export const apiProjectResourcePlanAllocationFetch = (resId) => {
  const endpoint = ENDPOINT_PROJECT_RESOURCE_PLAN_FETCH_ALLOCATIONS + resId;
  return fetch(endpoint);
};

export const apiProjectResourcePlansFetch = (pid) => {
  const endpoint = ENDPOINT_PROJECT_RESOURCE_PLAN_FETCH + pid;
  return fetch(endpoint);
};

export const apiFetchGlobalRates = () => fetch(ENDPOINT_PROJECT_RATES_FETCH);

export const apiProjectUpdate = (project) => {
  const endpoint = ENDPOINT_PROJECT_UPDATE + project.pid;
  return sendPostRequest(endpoint, project);
};

export const apiProjectResourcePlanCreate = data => sendPostRequest(ENDPOINT_PROJECT_RESOURCE_PLAN_CREATE, data);

export const apiProjectResoourcePlanAllocationAdd = (allocations, resId) => {
  const endpoint = ENDPOINT_PROJECT_RESOURCE_PLAN_ADD_ALLOCATIONS + resId;
  for (const key in allocations) {
    allocations[key] = createFormData(allocations[key]);
  }
  return sendPostRequest(endpoint, allocations);
};

export const apiProjectTasksUpdate = (task) => {
  const endpoint = ENDPOINT_PROJECT_TASKS_UPDATE + task.pid;
  return sendPostRequest(endpoint, task);
};

export const apiProjectTaskCreate = task => sendPostRequest(ENDPOINT_PROJECT_TASKS_CREATE, task);

export const apiProjectTotalUpdate = (total) => {
  const endpoint = ENDPOINT_PROJECT_TOTAL_UPDATE + total.pid;
  return sendPostRequest(endpoint, total);
};

export const apiListProjects = () => fetch(ENDPOINT_PROJECT_DETAILS);

export const apiFetchProject = pid => fetch(`${ENDPOINT_PROJECT_DETAILS}/${pid}`);

export const apiProjectRates = pid => fetch(ENDPOINT_PROJECT_RATES + pid);

export const apiProjectTasks = pid => fetch(ENDPOINT_PROJECT_TASKS + pid);

export const apiProjectRatesUpdate = (rate) => {
  const endpoint = ENDPOINT_PROJECT_RATES_UPDATE + rate.rid;
  return sendPostRequest(endpoint, rate);
};

export const apiGlobalProjectRatesUpdate = (rate) => {
  if (rate.rid) {
    const endpoint = ENDPOINT_GLOBAL_RATES_UPDATE + rate.rid;
    return sendPostRequest(endpoint, rate);
  }

  return sendPostRequest(ENDPOINT_GLOBAL_PROJECT_RATE_CREATE, rate);
};

export const apiProjectRateCreate = (rate, pid = null) => {
  const rates = [];
  if (pid !== null) {
    for (const key in rate) {
      rate[key].pid = pid;
      rates[key] = createFormData(rate[key]);
    }
  }
  return sendPostRequest(ENDPOINT_PROJECT_RATE_CREATE, rates);
};

export const apiProjectCreate = project => sendPostRequest(ENDPOINT_PROJECT_CREATE, project);

export const apiProjectUFactorsCreate = (uFactor, pid = null) => {
  const uFactors = [];
  if (pid !== null) {
    for (const key in uFactor) {
      uFactor[key].pid = pid;
      uFactors[key] = createFormData(uFactor[key]);
    }
  }
  return sendPostRequest(ENDPOINT_PROJECT_UFACTORS_CREATE, uFactors);
};

export const apiProjectUFactors = pid => fetch(ENDPOINT_PROJECT_UFACTORS + pid);

export const apiProjectUFactorsUpdate = (uFactor) => {
  const endpoint = ENDPOINT_PROJECT_UFACTORS_UPDATE + uFactor.ufid;
  return sendPostRequest(endpoint, uFactor);
};

const sendPostRequest = (endpoint, data) => {
  const formData = createFormData(data);
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formData,
  });
};

const createFormData = (data) => {
  const formData = new URLSearchParams();
  if (data !== undefined) {
    for (const key in data) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
