import React, {Component} from 'react';
import ProjectTabs from '../../project/components/ProjectTabs/';

class Project extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <ProjectTabs pid={ this.props.match.params.pid } />
      </div>
    )
  }
}

export default Project;
