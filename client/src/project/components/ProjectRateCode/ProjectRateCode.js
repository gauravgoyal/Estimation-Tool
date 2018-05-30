import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import config from '../../../config';

class ProjectRateCode extends Component {

  render = () => {
    const { rates } = this.props;
    return (
      <FormGroup>
        <Label for="rateCodeList">Select Rate Code</Label>
        <Input required type="select" name="rateCodeList" id="rateCodeList" onChange = { this.props.onChange.bind(this) }>
          <option key='select-rate-code' value=''>Select Rate code</option>
          {rates.map((rate) => {
            return <option key={ rate.rid } value={ rate.rid }>[{rate.code}] - { rate.role }</option>
          })}
        </Input>
      </FormGroup>
    )
  }
}

export default ProjectRateCode;
