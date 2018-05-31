import React, {Component} from 'react';
import { connect } from 'react-redux'
import { fetchProject } from '../../actions'
import ProjectTabs from '../../components/ProjectTabs'

class Tabs extends Component {

  componentDidMount = () => {
    const { dispatch } = this.props
    let pid = this.props.match.params.pid
    if (pid) {
      dispatch(fetchProject(pid))
    }
  }

  render() {
    const { isFetching } = this.props
    if (isFetching) {
      return (
        <h2>Loading...</h2>
      )
    }
    else {
      return (
        <ProjectTabs />
      )
    }
  }
}

const mapStateToProps = state => {
  const { isFetching, currProject } = state.projectOperations
  return {
    isFetching,
    currProject
  }
}

export default connect(mapStateToProps)(Tabs)

