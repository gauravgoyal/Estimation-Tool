import React, {Component} from 'react'
import { connect } from 'react-redux'
import ProjectRates from '../../components/ProjectRates';
import { fetchProjectRates, updateProjectRates, addProjectRate } from '../../actions'

class UFactors extends Component {

  render = () => {

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

export default connect(mapStateToProps)(UFactors)
