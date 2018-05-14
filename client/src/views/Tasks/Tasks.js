import React, {Component} from 'react';
import ProjectHours from '../../project/components/ProjectHours';
import ProjectTasks from '../../project/components/ProjectTasks';
import ProjectRateCode from '../../project/components/ProjectRateCode';
import { FormGroup, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Tasks extends Component {

  state = {
    tasks: [],
    newTask: {
      estimated_hours: 0,
      hours_low: 0,
      hours_high: 0,
      rate_low: 0,
      rate_high: 0,
      title: '',
      rid: '',
      ufid: '',
    },
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmitForm = (e) => {
    console.log(this.state.newTask);
    var formData = new URLSearchParams();
    formData.append('pid', this.props.pid);
    for (let key in this.state.newTask) {
      formData.append(key, this.state.newTask[key]);
    }

    // Call API to save Data.
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
    this.toggle();
  };


  handleConfidence = (conf, factors) => {
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

  handleRate = (rid, rate) => {
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

  handleChange = (field, newState) => {
    let value = newState[field];
    let newTask = this.state.newTask;
    newTask[field] = value;
    this.setState({
      newTask: newTask,
    });
  }

  handleData = (field, e) => {
    let newTask = this.state.newTask;
    if (e.target.value !== '') {
      newTask[field] = e.target.value;
      this.setState(newTask);
    }
  }

  render() {
    const newTask = this.state.newTask;
    return (
      <div className="animated fadeIn">
        <ProjectTasks editable={true} refresh={this.state.modal} pid={ this.props.pid }/>
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
              <ProjectHours onChange= {this.handleConfidence.bind(this)} pid={this.props.pid} />
              <div className="hours_low"><span className="low-hours">Low Hours:</span> { newTask.hours_low} </div>
              <div className="hours_high"><span className="high-hours">High Hours:</span> { newTask.hours_high} </div>
            </FormGroup>
            <FormGroup>
              <ProjectRateCode onChange= {this.handleRate.bind(this)} pid={this.props.pid} />
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

export default Tasks;
