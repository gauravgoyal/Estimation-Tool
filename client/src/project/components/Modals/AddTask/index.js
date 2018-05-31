import React, {Component} from 'react';
import ProjectHours from '../../ProjectHours';
import ProjectRateCode from '../../ProjectRateCode';
import {
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class AddTask extends Component {
  state = {
    modal: false,
    newTask: {
      hours_low: 0,
      hours_high: 0,
      rate_low: 0,
      rate_high: 0,
      assumptions: '',
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleData = (field, e) => {
    let newTask = this.state.newTask;
    if (e.target.value !== '') {
      newTask[field] = e.target.value;
      this.setState(newTask);
    }
  }

  onSubmitForm = (e) => {
    this.props.submitForm(this.state.newTask)
    this.toggle();
  };

  handleConfidence = (e) => {
    const { ufactors } = this.props;
    let conf = {};
    let key = Number (e.target.value);
    if (key) {
      ufactors.map((factor) => {
        if (factor.ufid === key) {
          conf.lower_multiplier = factor.lower_multiplier;
          conf.heigher_multiplier = factor.heigher_multiplier;
        }
        return conf;
      })
      this.handleProjectHours(key, conf);
    }
  }

  handleProjectHours = (conf, factors) => {
    let newTask = this.state.newTask;
    if (conf) {
      let estimated_hours = newTask.estimated_hours ? newTask.estimated_hours : 0;
      let hours_low = estimated_hours * factors.lower_multiplier;
      let hours_high = estimated_hours * factors.heigher_multiplier;
      newTask.hours_low = hours_low;
      newTask.hours_high = hours_high;
      newTask.ufid = conf;
      this.setState({
        newTask: newTask,
      });
    }
  }

  handleRates = (e) => {
    const { rates } = this.props;
    let selectedRate = {};
    let key = Number (e.target.value);
    if (key) {
      rates.map((rate) => {
        if (rate.rid === key) {
          selectedRate.rate = rate.rate;
        }
        return selectedRate;
      })
      this.handleProjectRates(key, selectedRate);
    }
  }

  handleProjectRates = (rid, rate) => {
    let newTask = this.state.newTask;
    if (rid) {
      let rate_low = rate.rate * newTask.hours_low;
      let rate_high = rate.rate * newTask.hours_high;
      newTask.rate_low = rate_low;
      newTask.rate_high = rate_high;
      newTask.rid = rid;
      this.setState({
        newTask: newTask,
      });
    }
  }

  render = () => {
    const {rates, ufactors} = this.props
    const { newTask } = this.state
    return (
      <div className="animated fadeIn">
        <Button
          onClick={this.toggle.bind(this)}
          size="sm" color="primary">
          <i className="p-1 fa fa-dot-circle-o"></i> Add Task
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Add Project Tasks</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="title">Title </Label>
              <Input
                onChange={this.handleData.bind(this, 'title')}
                id='title'
                placeholder="Please enter task name"
              >
              </Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="estimated_hours">Estimated Hours: </Label>
              <Input
                placeholder="Please enter estimated hours"
                onChange={this.handleData.bind(this, 'estimated_hours')}
                id='estimated_hours'
                type="number"
              >
              </Input>
            </FormGroup>
            <FormGroup>
              <ProjectHours factors = { ufactors } onChange = {this.handleConfidence.bind(this)} />
              <div className="hours_low"><span className="low-hours">Low Hours:</span> { newTask.hours_low} </div>
              <div className="hours_high"><span className="high-hours">High Hours:</span> { newTask.hours_high} </div>
            </FormGroup>
            <FormGroup>
              <ProjectRateCode rates = { rates } onChange = {this.handleRates.bind(this)} />
              <div className="hours_low"><span className="low-rate">Low Rate: </span>${ newTask.rate_low} </div>
              <div className="hours_high"><span className="high-rate">High Rate: </span>${ newTask.rate_high} </div>
            </FormGroup>
            <FormGroup>
              <Label for="assumptions">Assumptions</Label>
              <Input onChange={this.handleData.bind(this, 'assumptions')}
                type="textarea" name="assumptions" id="assumptions" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.onSubmitForm}
              type="submit"
              size="sm"
              color="primary">
              <i className="fa fa-dot-circle-o"></i> Submit
            </Button>
            <Button
              onClick={this.toggle.bind(this)}
              size="sm"
              color="secondary">
              <i className="fa fa-dot-circle-o"></i> Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default AddTask;
