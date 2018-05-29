import React, {Component} from 'react'
import { connect } from 'react-redux'
import ProjectRates from '../../components/ProjectRates';
import { fetchProjectRates, updateProjectRates } from '../../actions'

class Rates extends Component {

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

  render() {
    const { isFetching, projectRates } = this.props
    return (
      <div className="animated fadeIn">
        {
          (isFetching) ?
          <div className="m-3 p-3"><h3>Please select a project to view rates!</h3></div>
          :
          <ProjectRates rates={projectRates} handleChange={this.updateRates.bind(this)} />
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
