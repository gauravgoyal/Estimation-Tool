import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class ProjectRateCode extends Component {

  render = () => {
    const { rates } = this.props;
    return (
      <FormGroup>
        <Label for="rateCodeList">Select Role</Label>
        <Input required type="select" name="rateCodeList" id="rateCodeList" onChange = { this.props.onChange.bind(this) }>
          <option key='select-rate-code' value=''>Select Role</option>
          {rates.map((rate) => {
            return <option key={ rate.rid } value={ rate.rid }>{ rate.role }</option>
          })}
        </Input>
      </FormGroup>
    )
  }
}

export default ProjectRateCode;
