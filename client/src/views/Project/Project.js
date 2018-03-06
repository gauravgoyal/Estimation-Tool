import React, {Component} from 'react';

class Project extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="animated fadeIn">

        Project id {this.props.match.params.pid}
      </div>
    )
  }
}

export default Project;
