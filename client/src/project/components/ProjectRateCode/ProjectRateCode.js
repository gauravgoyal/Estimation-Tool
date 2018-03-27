import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class ProjectRateCode extends Component {

  state = {
    rates : [],
    pid: ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid != this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ((prevState.pid != this.state.pid)) {
      fetch('/api/rates/' + this.state.pid)
        .then(res => res.json())
        .then(rates => this.setState({
          rates: rates
        })
      );
    }
  }

  componentDidMount = () => {
    fetch('/api/rates/' + this.props.pid)
      .then(res => res.json())
      .then(rates => this.setState({
        rates: rates
      })
    );
  }

  handleRates = (e) => {
    let selectedRate = {};
    if (e.target.value) {
      this.state.rates.map((rate) => {
        if (rate.rid == e.target.value) {
          selectedRate.rate = rate.rate;
        }
        return selectedRate;
      })
      this.props.onChange(e.target.value, selectedRate);
    }
  }

  render = () => {
    const { rates, pid } = this.state;
    return (
      <FormGroup>
        <Label for="rateCodeList">Select Rate Code</Label>
        <Input required type="select" name="rateCodeList" id="rateCodeList" onChange= { this.handleRates.bind(this) }>
          <option key='select-rate-code' value=''>Select Rate code</option>
          {rates.map((rate) => {
            return <option key={ rate.rid } value={ rate.rid }>{ rate.role }</option>
          })}
        </Input>
      </FormGroup>
    )
  }
}

export default ProjectRateCode;
