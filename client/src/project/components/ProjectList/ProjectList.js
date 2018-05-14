import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import config from '../../../config';

class ProjectList extends Component {

  state = {
    projects : [],
  }

  componentDidMount = () => {
    fetch(config.api_url + 'projects')
      .then(res => res.json())
      .then(projects => this.setState({projects}));
  }

  render = () => {
    const { projects } = this.state;
    return (
      <FormGroup>
        <Label for="projectList">Select Project</Label>
        <Input required type="select" name="projectList" id="projectList" onChange= { this.props.onChange }>
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
