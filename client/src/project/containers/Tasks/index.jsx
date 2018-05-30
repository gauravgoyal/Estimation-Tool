import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchProjectTasks, updateProjectTasks, updateProjectTotal, fetchProjectTotal } from '../../actions'
import ProjectTasks from '../../components/ProjectTasks';

class Tasks extends Component {

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(fetchProjectTasks())
    dispatch(fetchProjectTotal())
  }

  generateNewTask = (item, field) => {
    const { projectRates, projectUFactors } = this.props
    projectUFactors.map((uFactor) => {
      if (uFactor.ufid === item.ufid) {
        item.hours_low = item.estimated_hours * uFactor.lower_multiplier;
        item.hours_high = item.estimated_hours * uFactor.heigher_multiplier;
      }
      return item
    })

    projectRates.map((projectRate) => {
      if (projectRate.rid === Number (item.rid)) {
        item.rate_low = item.hours_low * projectRate.rate;
        item.rate_high = item.hours_high * projectRate.rate;
      }
      return item
    })
    return item
  }

  calculateTotal = (tasks) => {
    const { projectTotal } = this.props
    projectTotal.estimated_hours = 0;
    projectTotal.high_estimated_hours = 0;
    projectTotal.low_estimated_hours = 0;
    projectTotal.high_estimated_cost = 0
    projectTotal.low_estimated_cost = 0
    tasks.map((task) => {
      projectTotal.estimated_hours += Number (task.estimated_hours)
      projectTotal.high_estimated_hours += task.hours_high
      projectTotal.low_estimated_hours += task.hours_low
      projectTotal.high_estimated_cost += task.rate_high
      projectTotal.low_estimated_cost += task.rate_low
      return projectTotal
    })
    return projectTotal
  }

  onHandleChange = (index, field, newState) => {
    const { projectTasks, dispatch } = this.props
    let item = projectTasks[index];
    if (field === 'ufid' || field === 'rid') {
      item[field] = newState.target.value;
    }
    else {
      item[field] = newState[field];
    }

    if (field === 'ufid' || field === 'rid' || field === 'estimated_hours') {
      item = this.generateNewTask(item, field);
    }
    projectTasks[index] = item
    let project = this.calculateTotal(projectTasks)
    dispatch(updateProjectTasks(item, index))
    dispatch(updateProjectTotal(project))
  }

  render = () => {
    const { isFetching, projectTasks, projectRates, projectUFactors, projectTotal } = this.props
    if (isFetching) {
      return (
        <h2>Loading...</h2>
      )
    }
    else {
      return (
        <ProjectTasks
          tasks = { projectTasks }
          rates = { projectRates }
          ufactors = { projectUFactors }
          handleChange = { this.onHandleChange.bind(this) }
          projectTotal = { projectTotal }
        />
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { isFetching, currProject } = state.projectOperations
  const { projectTasks, inValidate, projectTotal } = state.projectTasks
  const { projectRates } = state.projectRates
  const { projectUFactors } = state.projectUFactors
  return {
    isFetching,
    projectTasks,
    projectRates,
    projectUFactors,
    inValidate,
    projectTotal
  }
}

export default connect(mapStateToProps)(Tasks);
