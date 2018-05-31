import React, {Component} from 'react'
import { connect } from 'react-redux'
import ProjectDetailsComponent from "../../components/ProjectDetails/"
import { updateProjectDetails } from '../../actions'

class ProjectDetails extends Component {

  updateValue = (field, newState) => {
    const { currProject, dispatch } = this.props;
    currProject[field] = newState[field];
    dispatch(updateProjectDetails(currProject));
  }

  render() {
    const { isFetching, currProject} = this.props
    if (isFetching) {
      return (<h2>Loading...</h2>)
    }
    else {
      return (<ProjectDetailsComponent project = {currProject} handleChange={this.updateValue.bind(this)}/>)
    }
  }

}

const mapStateToProps = (state) => {
  const { isFetching, currProject } = state.projectOperations
  return {
    isFetching,
    currProject
  }
}

export default connect(mapStateToProps)(ProjectDetails);
