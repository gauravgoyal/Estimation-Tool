import React, {Component} from 'react'
import { connect } from 'react-redux'
import ProjectRates from '../../components/ProjectRates';
import { fetchProjectRates, updateProjectRates, addProjectRate } from '../../actions'

class Rates extends Component {

  state = {
    category: '',
    role: '',
    rate: '',
  };

  componentDidMount = () => {
    const {currProject, dispatch} = this.props
    dispatch(fetchProjectRates(currProject.pid));
  }

  updateRates = (index, field, newState) => {
    const {projectRates, dispatch} = this.props
    let item = projectRates[index];
    item[field] = newState[field];
    projectRates[index] = item;
    dispatch(updateProjectRates(item, projectRates))
  }

  onSubmitForm = () => {
    let rate = this.state;
    const {projectRates, currProject, dispatch} = this.props
    rate.pid = currProject.pid;
    projectRates.push(rate);
    dispatch(addProjectRate(rate, projectRates))
  }

  updateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {};
      data[field] = e.target.value;
      this.setState(data);
    }
  }

  render() {
    const { isFetching, projectRates } = this.props
    return (
      <div className="animated fadeIn">
        {
          (isFetching) ?
          <div className="m-3 p-3"><h3>Please select a project to view rates!</h3></div>
          :
          <ProjectRates
            rates={projectRates}
            handleChange={this.updateRates.bind(this)}
            submitForm={this.onSubmitForm.bind(this)}
            onUpdate = {this.updateValue.bind(this)}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currProject } = state.projectOperations
  const { isFetching, projectRates } = state.projectRates
  return {
    isFetching,
    projectRates,
    currProject
  }
}

export default connect(mapStateToProps)(Rates)
