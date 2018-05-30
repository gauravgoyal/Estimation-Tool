import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchProjectTasks, updateProjectTasks } from '../../actions'
import ProjectTasks from '../../components/ProjectTasks';

class Tasks extends Component {

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(fetchProjectTasks())
  }

  generateNewTask = (item, field) => {
    const { projectRates, projectUFactors } = this.props
    item.hours_low = item.estimated_hours * projectUFactors[item.ufid].lower_multiplier;
    item.hours_high = item.estimated_hours * projectUFactors[item.ufid].heigher_multiplier;
    item.rate_low = item.hours_low * projectRates[item.rid].rate;
    item.rate_high = item.hours_high * projectRates[item.rid].rate;
    return item;
  }

  componentWillReceiveProps = (nextProps) => {
    const { inValidate } = this.props
    if (nextProps.inValidate !== inValidate && inValidate === true) {
      const { dispatch } = nextProps
      dispatch(fetchProjectTasks())
    }
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

    dispatch(updateProjectTasks(item, index))

    // fetch(config.api_url + 'tasks/update/' + item.rid, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    //   body: formData
    // })
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     if (result.status === 200) {
    //       let tasks = this.state.tasks;
    //       tasks[index] = item;
    //       this.setState({
    //         tasks: tasks
    //       })
    //       this.calculateTotal();
    //       var formData = new URLSearchParams();
    //       for (let key in this.state.total) {
    //         formData.append(key, this.state.total[key]);
    //       }
    //       fetch(config.api_url + 'project-total/update/' + item.pid, {
    //         method: "POST",
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //         },
    //         body:formData
    //       })
    //       .then(res => res.json())
    //     }
    //   }
    // )
  }

  render = () => {
    const { isFetching, projectTasks, projectRates, projectUFactors } = this.props
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
        />
      )
    }
  }

}

const mapStateToProps = (state) => {
  const { isFetching } = state.projectOperations
  const { projectTasks, inValidate } = state.projectTasks
  const { projectRates } = state.projectRates
  const { projectUFactors } = state.projectUFactors
  return {
    isFetching,
    projectTasks,
    projectRates,
    projectUFactors,
    inValidate
  }
}

export default connect(mapStateToProps)(Tasks);
