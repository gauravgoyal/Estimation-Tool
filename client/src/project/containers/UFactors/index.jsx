import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchProjectUfactors, updateProjectUfactors, addProjectUFactors } from '../../actions'
import ProjectUncertainityFactors from '../../components/ProjectUncertainityFactors';

class UFactors extends Component {

  state = {}

  componentDidMount = () => {
    const {currProject, dispatch} = this.props
    dispatch(fetchProjectUfactors(currProject.pid));
  }

  onHandleChange = (index, field, newState) => {
    const { projectUFactors, dispatch} = this.props
    let item = projectUFactors[index];
    item[field] = newState[field];
    projectUFactors[index] = item;
    dispatch(updateProjectUfactors(item, projectUFactors))
  }

  onSubmitForm = () => {
    let uFactor = this.state;
    const {projectUFactors, currProject, dispatch} = this.props
    uFactor.pid = currProject.pid;
    projectUFactors.push(uFactor);
    dispatch(addProjectUFactors(uFactor, projectUFactors))
  }

  updateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {};
      data[field] = e.target.value;
      this.setState(data);
    }
  }


  render = () => {
    const {isFetching, projectUFactors} = this.props
    if (isFetching) {
      return (<h2>Loading...</h2>)
    }
    else {
      return (
        <ProjectUncertainityFactors
          uFactors={ projectUFactors }
          handleChange={ this.onHandleChange.bind(this) }
          submitForm={this.onSubmitForm.bind(this)}
          onUpdate = {this.updateValue.bind(this)}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  const { currProject } = state.projectOperations
  const { isFetching, projectUFactors } = state.projectUFactors
  return {
    isFetching,
    projectUFactors,
    currProject
  }
}

export default connect(mapStateToProps)(UFactors)
