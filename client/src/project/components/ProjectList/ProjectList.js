import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class ProjectList extends Component {

  state = {
    projects : [],
  }

  componentDidMount = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(projects => this.setState({projects}));
  }

  render = () => {
    const { projects } = this.state;
    return (
      <FormGroup>
        <Label for="projectList">Select Project</Label>
        <Input type="select" name="projectList" id="projectList" onChange= { this.props.onChange }>
          <option key='select-project' value=''>Select Project</option>
          {projects.map((project) => {
            return <option key={ project.pid } value={ project.pid }>{ project.title }</option>
          })}
        </Input>
      </FormGroup>
    )
  }
}

export default ProjectList;
