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
  apiProjectUFactorsUpdate,
  apiProjectTasks,
  apiProjectTasksUpdate,
  apiProjectTotalUpdate,
  apiProjectTaskCreate,
  apiProjectResourcePlanCreate,
  apiProjectResoourcePlanAllocationAdd,
  apiProjectResourcePlansFetch,
  apiProjectResourcePlanAllocationFetch,
  apiProjectResourcePlanAllocationUpdate
} from '../api';

import {
  identifyRoleType,
  indentifyResourceType,
  getRoleType,
  getResourceType
} from '../functions';

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
export const PROJECT_TASKS_FETCH_REQUEST = 'PROJECT_TASKS_FETCH_REQUEST'
export const PROJECT_TASKS_FETCH_SUCCESS = 'PROJECT_TASKS_FETCH_SUCCESS'
export const PROJECT_TASKS_UPDATE_REQUEST = 'PROJECT_TASKS_UPDATE_REQUEST'
export const PROJECT_TASKS_UPDATE_SUCCESS = 'PROJECT_TASKS_UPDATE_SUCCESS'
export const PROJECT_TOTAL_UPDATE_REQUEST = 'PROJECT_TOTAL_UPDATE_REQUEST'
export const PROJECT_TOTAL_UPDATE_SUCCESS = 'PROJECT_TOTAL_UPDATE_SUCCESS'
export const PROJECT_TOTAL_FETCH_REQUEST = 'PROJECT_TOTAL_FETCH_REQUEST'
export const PROJECT_TOTAL_FETCH_SUCCESS = 'PROJECT_TOTAL_FETCH_SUCCESS'
export const PROJECT_TASKS_CREATE_REQUEST = 'PROJECT_TASKS_CREATE_REQUEST'
export const PROJECT_TASKS_CREATE_SUCCESS = 'PROJECT_TASKS_CREATE_SUCCESS'
export const PROJECT_RESOURCE_PLAN_CREATE_REQUEST = 'PROJECT_RESOURCE_PLAN_CREATE_REQUEST'
export const PROJECT_RESOURCE_PLAN_CREATE_SUCCESS = 'PROJECT_RESOURCE_PLAN_CREATE_SUCCESS'
export const PROJECT_RESOURCE_PLAN_FETCH_REQUEST = 'PROJECT_RESOURCE_PLAN_FETCH_REQUEST'
export const PROJECT_RESOURCE_PLAN_FETCH_SUCCESS = 'PROJECT_RESOURCE_PLAN_FETCH_SUCCESS'
export const PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_REQUEST = 'PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_REQUEST'
export const PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_SUCCESS = 'PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_SUCCESS'
export const PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_REQUEST = 'PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_REQUEST'
export const PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_SUCCESS = 'PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_SUCCESS'
export const PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_REQUEST = 'PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_REQUEST'
export const PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_SUCCESS = 'PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_SUCCESS'

const projectResourcePlanAllocationAddRoleRequest = () => ({
  type: PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_REQUEST
})

const projectResourcePlanAllocationAddRoleSuccess = (data, resId) => ({
  type: PROJECT_RESOURCE_PLAN_ALLOCATION_ADD_SUCCESS,
  data: data,
  resId: resId
})

const projectResourcePlanAllocationUpdateRequest = () => ({
  type: PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_REQUEST
})

const projectResourcePlanAllocationUpdateSuccess = (resId) => ({
  type: PROJECT_RESOURCE_PLAN_ALLOCATION_UPDATE_SUCCESS,
  resId: resId
})


const projectResourcePlanAllocationFetchRequest = () => ({
  type: PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_REQUEST
})

const projectResourcePlanAllocationFetchSuccess = (data, resId) => ({
  type: PROJECT_RESOURCE_PLAN_ALLOCATION_FETCH_SUCCESS,
  data: data,
  resId: resId
})

const projectResourcePlanCreateRequest = () => ({
  type: PROJECT_RESOURCE_PLAN_CREATE_REQUEST
})

const projectResourcePlanCreateSuccess = (data, resId) => ({
  type: PROJECT_RESOURCE_PLAN_CREATE_SUCCESS,
  data: data,
  resId: resId
})

const projectResourcePlanFetchRequest = () => ({
  type: PROJECT_RESOURCE_PLAN_FETCH_REQUEST
})

const projectResourcePlanFetchSuccess = (data) => ({
  type: PROJECT_RESOURCE_PLAN_FETCH_SUCCESS,
  data: data
})

const sendProjectFetchRequest = () => ({
  type: PROJECT_FETCH_REQUEST
})

const projectFetchSuccess = (project) => ({
  type: PROJECT_FETCH_SUCCESS,
  data: project
})

const sendProjectTasksFetchRequest = () => ({
  type: PROJECT_TASKS_FETCH_REQUEST
})

const projectTasksFetchSuccess = (tasks) => ({
  type: PROJECT_TASKS_FETCH_SUCCESS,
  data: tasks
})

const sendProjectTotalFetchRequest = () => ({
  type: PROJECT_TOTAL_FETCH_REQUEST
})

const projectTotalFetchSuccess = (total) => ({
  type: PROJECT_TOTAL_FETCH_SUCCESS,
  data: total
})

const sendProjectTotalUpdateRequest = () => ({
  type: PROJECT_TOTAL_UPDATE_REQUEST
})

const projectTotalUpdateSuccess = (total) => ({
  type: PROJECT_TOTAL_UPDATE_SUCCESS,
  data: total
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

const sendProjectTaskCreateRequest = () => ({
  type: PROJECT_TASKS_CREATE_REQUEST
})

const projectTaskCreateSuccess = (json) => ({
  type: PROJECT_TASKS_CREATE_SUCCESS,
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

const sendProjectTasksUpdateRequest = () => ({
  type: PROJECT_TASKS_UPDATE_REQUEST
})

const projectTasksUpdateSuccess = (tasks) => ({
  type: PROJECT_TASKS_UPDATE_SUCCESS,
  data: tasks
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
  .then((json) => {
    json.forEach((rate, index) => {
      rate.role_type = identifyRoleType(rate);
      rate.resource_type = indentifyResourceType(rate);
      json[index] = rate;
    })
    dispatch(projectRateSuccess(json))
  })
}

export const updateProjectRates = (item, rates) => (dispatch) => {
  dispatch(sendProjectRateUpdateRequest())
  return apiProjectRatesUpdate(item)
  .then(res => res.json())
  .then(json => {
    dispatch(projectRateUpdateSuccess(rates))
    dispatch(fetchProjectTasks())
  })
}

export const addProjectRate = (rate, rates) => (dispatch) => {
  dispatch(sendProjectRateCreateRequest());
  rate.role_type = getRoleType(rate);
  rate.resource_type = getResourceType(rate);
  return apiProjectRatesUpdate(rate)
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
    apiProjectRateCreate(defaultRates, pid)
    .then(res => res.json())
    .then(json => {
      apiProjectUFactorsCreate(defaultUFactors, pid)
      .then(res => res.json())
      .then(json => dispatch(projectCreateSuccess(project)))
    })
  })
}

export const fetchProjectUfactors = () => (dispatch, getState) => {
  dispatch(projectUFactorsRequest());
  let pid = getState().projectOperations.currProject.pid;
  return apiProjectUFactors(pid)
  .then(res => res.json())
  .then(json => dispatch(projectUFactorsSuccess(json)))
}

export const updateProjectUfactors = (uFactor, uFactors) => (dispatch) => {
  dispatch(sendProjectUfactorsUpdateRequest())
  return apiProjectUFactorsUpdate(uFactor)
  .then(res => res.json())
  .then(json => {
    dispatch(projectUfactorsUpdateSuccess(uFactors))
    dispatch(fetchProjectTasks())
  })
}

export const addProjectUFactors = (uFactor, uFactors) => (dispatch) => {
  dispatch(sendProjectUfactorRequest());
  return apiProjectUFactorsUpdate(uFactor)
  .then(res => res.json())
  .then(json => dispatch(projectUfactorSuccess(uFactors)))
}

export const fetchProjectTasks = () => (dispatch, getState) => {
  let pid = getState().projectOperations.currProject.pid;
  dispatch(sendProjectTasksFetchRequest());
  return apiProjectTasks(pid)
  .then(res => res.json())
  .then(json => dispatch(projectTasksFetchSuccess(json)))
}

export const updateProjectTasks = (task, index) => (dispatch, getState) => {
  let pid = getState().projectOperations.currProject.pid;
  task.pid = pid;
  let tasks = getState().projectTasks.projectTasks;
  tasks[index] = task;
  dispatch(sendProjectTasksUpdateRequest())
  return apiProjectTasksUpdate(task)
  .then(res => res.json())
  .then(json => dispatch(projectTasksUpdateSuccess(tasks)))
}

export const updateProjectTotal = (total) => (dispatch, getState) => {
  dispatch(sendProjectTotalUpdateRequest())
  return apiProjectTotalUpdate(total)
  .then(res => res.json())
  .then(json => dispatch(projectTotalUpdateSuccess(total)))
}

export const fetchProjectTotal = (total) => (dispatch, getState) => {
  dispatch(sendProjectTotalFetchRequest())
  let project = getState().projectOperations.currProject
  dispatch(projectTotalFetchSuccess(project))
}

export const createProjectTask = (task) => (dispatch, getState) => {
  dispatch(sendProjectTaskCreateRequest())
  let tasks = getState().projectTasks.projectTasks
  let pid = getState().projectOperations.currProject.pid
  task.pid = pid
  return apiProjectTaskCreate(task)
  .then(res => res.json())
  .then(json => {
    task.tid = json.pop()
    tasks.push(task)
    dispatch(projectTaskCreateSuccess(tasks))
    dispatch(fetchProjectTasks())
  })
}

export const createProjectPlan = (defaultAllocation, weeks) => (dispatch, getState) => {
  dispatch(projectResourcePlanCreateRequest())
  let pid = getState().projectOperations.currProject.pid
  let data = {
    pid: pid,
    weeks: weeks
  }
  apiProjectResourcePlanCreate(data)
  .then(res => res.json())
  .then(json => {
    let resource_id = json.pop();
    let projectAllocations = [];
    defaultAllocation.forEach((data, index) => {
      projectAllocations =  projectAllocations.concat(prepareAllocationData(data, resource_id))
      defaultAllocation[index].resId = resource_id
    })
    apiProjectResoourcePlanAllocationAdd(projectAllocations, resource_id)
    .then(res => res.json())
    .then(json => dispatch(projectResourcePlanCreateSuccess(defaultAllocation, resource_id)))
  })
}

const prepareAllocationData = (data, resource_id) => {
  let allocations = [];
  Object.keys(data).forEach((key) => {
    let matches = key.match(/\(W(\d+)\)/)
    if (matches !== null) {
      let allocation = {
        res_id : resource_id,
        rid: data.rid,
        week: matches[1],
        week_name: key,
        hours: (data[key] === '') ? 0 : data[key]
      }
      allocations.push(allocation)
    }
  })
  return allocations
}

export const fetchProjectResourcePlans = () => (dispatch, getState) => {
  let pid = getState().projectOperations.currProject.pid
  dispatch(projectResourcePlanFetchRequest())
  apiProjectResourcePlansFetch(pid)
  .then(res => res.json())
  .then(json => dispatch(projectResourcePlanFetchSuccess(json)))
}

export const fetchProjectResourceAllocations = (res_id, plan) => (dispatch, getState) => {
  dispatch(projectResourcePlanAllocationFetchRequest())
  apiProjectResourcePlanAllocationFetch(res_id)
  .then(res => res.json())
  .then(result => {
    let projectRates = getState().projectRates.projectRates
    let currPlan = []
    currPlan = prepareResourceAllocationRows(projectRates, result)
    // Resetting the array keys to default.
    let finalCurrPlan = []
    currPlan.forEach((data) => {
      data.resId = res_id
      finalCurrPlan.push(data)
    })
    finalCurrPlan.weeks = plan.weeks
    finalCurrPlan.lock = plan.lock
    dispatch(projectResourcePlanAllocationFetchSuccess(finalCurrPlan, res_id))
  })
}

const prepareResourceAllocationRows = (projectRates, allocations) => {
  let rateOptions = []
  let currPlan = []
  projectRates.forEach((rate) => {
    rateOptions[rate.rid] = rate.role
  })

  allocations.forEach((data, key) => {
    if (currPlan[data.rid] !== undefined) {
      currPlan[data.rid][data.week_name] = data.hours
    }
    else {
      currPlan[data.rid] = {}
      currPlan[data.rid][data.week_name] = data.hours
    }
    if (currPlan[data.rid].role === undefined) {
      currPlan[data.rid].role = rateOptions[data.rid]
      currPlan[data.rid].rid = data.rid
    }
  })
  return currPlan
}

export const updateProjectResourceAllocations = (allocation) => (dispatch, getState) => {
  dispatch(projectResourcePlanAllocationUpdateRequest())
  apiProjectResourcePlanAllocationUpdate(allocation)
  .then(res => res.json())
  .then(json => dispatch(projectResourcePlanAllocationUpdateSuccess(allocation.resId)))
}

export const addProjectResourceAllocation = (allocation, resId) => (dispatch, getState) => {
  dispatch(projectResourcePlanAllocationAddRoleRequest())
  let projectRates = getState().projectRates.projectRates
  let rateOptions = []
  projectRates.forEach((rate) => {
    rateOptions[rate.role] = rate.rid
  })
  allocation.rid = rateOptions[allocation.role]
  allocation.resId = resId
  let allocations = prepareAllocationData(allocation, resId)
  apiProjectResoourcePlanAllocationAdd(allocations, resId)
    .then(res => res.json())
    .then(json => dispatch(projectResourcePlanAllocationAddRoleSuccess(allocation, resId)))
}
