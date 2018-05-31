import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class ProjectHours extends Component {

  render = () => {
    const { factors } = this.props;
    return (
      <FormGroup>
        <Label for="confidenceFactorList">Select Confidence Factor</Label>
        <Input required type="select" name="confidenceFactorList" id="confidenceFactorList" onChange= { this.props.onChange.bind(this) }>
          <option key='select-confidence-factor' value=''>Select Confidence Factor</option>
          {factors.map((factor) => {
            return <option key={ factor.ufid } value={ factor.ufid }>{ factor.title } - [{factor.points}]</option>
          })}
        </Input>
      </FormGroup>
    )
  }
}

export default ProjectHours;
