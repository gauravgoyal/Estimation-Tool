import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchProjectUfactors, updateProjectUfactors } from '../../actions'
import ProjectUncertainityFactors from '../../components/ProjectUncertainityFactors';

class UFactors extends Component {

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
