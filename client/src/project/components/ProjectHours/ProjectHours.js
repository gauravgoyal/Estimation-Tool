import React, {Component} from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class ProjectHours extends Component {

  state = {
    factors : [],
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
      fetch('/api/factors/' + this.state.pid)
        .then(res => res.json())
        .then(factors => this.setState({
          factors: factors
        })
      );
    }
  }

  componentDidMount = () => {
    fetch('/api/factors/' + this.props.pid)
      .then(res => res.json())
      .then(factors => this.setState({
        factors: factors
      })
    );
  }

  handleConfidence = (e) => {
    let conf = {};
    let key = Number (e.target.value);
    if (key) {
      this.state.factors.map((factor) => {
        if (factor.ufid === key) {
          conf.lower_multiplier = factor.lower_multiplier;
          conf.heigher_multiplier = factor.heigher_multiplier;
        }
        return conf;
      })
      this.props.onChange(key, conf);
    }
  }

  render = () => {
    const { factors } = this.state;
    return (
      <FormGroup>
        <Label for="confidenceFactorList">Select Confidence Factor</Label>
        <Input required type="select" name="confidenceFactorList" id="confidenceFactorList" onChange= { this.handleConfidence.bind(this) }>
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
