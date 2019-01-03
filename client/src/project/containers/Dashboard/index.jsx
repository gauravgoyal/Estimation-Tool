import React, {Component} from 'react';
import { connect } from 'react-redux'
import { listProjects, viewedProjects } from '../../actions'
import ProjectsDashboard from '../../components/ProjectsDashboard'

class Dashboard extends Component {

  pushProject = (project, e) => {
    this.props.dispatch(viewedProjects(project));
  }

  componentDidMount = () => {
    this.props.dispatch(listProjects());
  }

  render() {
    const { isFetching, projectsList } = this.props
    if (isFetching !== undefined && projectsList !== undefined) {
      return (
        <div className="animated fadeIn">
          {
            (isFetching) ? <h2>Loading...</h2> : <ProjectsDashboard projects={projectsList} addProject={this.pushProject.bind(this)} />
          }
        </div>
      );
    }
    else {
      return(
        <div>Waiting for projects to load....</div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { isFetching, projectsList } = state.projectOperations
  return {
    isFetching,
    projectsList
  }
}

export default connect(mapStateToProps)(Dashboard)
