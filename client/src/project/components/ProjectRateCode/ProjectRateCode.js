import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import config from '../../../config';

class ProjectRateCode extends Component {

  state = {
    rates : [],
    pid: ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid !== this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ((prevState.pid !== this.state.pid)) {
      fetch(config.api_url + 'rates/' + this.state.pid)
        .then(res => res.json())
        .then(rates => this.setState({
          rates: rates
        })
      );
    }
  }

  componentDidMount = () => {
    fetch(config.api_url + 'rates/' + this.props.pid)
      .then(res => res.json())
      .then(rates => this.setState({
        rates: rates
      })
    );
  }

  handleRates = (e) => {
    let selectedRate = {};
    let key = Number (e.target.value);
    if (key) {
      this.state.rates.map((rate) => {
        if (rate.rid === key) {
          selectedRate.rate = rate.rate;
        }
        return selectedRate;
      })
      this.props.onChange(key, selectedRate);
    }
  }

  render = () => {
    const { rates } = this.state;
    return (
      <FormGroup>
        <Label for="rateCodeList">Select Rate Code</Label>
        <Input required type="select" name="rateCodeList" id="rateCodeList" onChange= { this.handleRates.bind(this) }>
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
