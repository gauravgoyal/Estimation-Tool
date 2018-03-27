import React, {Component} from 'react';
import { Table } from 'reactstrap';
import {RIEInput} from 'riek';

class ProjectTasks extends Component {

  state = {
    tasks: [],
    rates: [],
    ufactors: [],
    loading: true,
    pid: '',
    refresh: false,
  }

  handleChange = (index, field, newState) => {
    let item = this.state.tasks[index];
    item[field] = newState[field];

    // Update tasks.
    var formData = new URLSearchParams();
    for (let key in item) {
      formData.append(key, item[key]);
    }
    fetch('/api/tasks/update/' + item.rid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.status == 200) {
          let tasks = this.state.tasks;
          tasks[index] = item;
          this.setState({
            tasks: tasks
          })
        }
      }
    )
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid != this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }

    if (nextProps.refresh != this.props.refresh) {
      this.setState({
        refresh: nextProps.refresh
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ((prevState.pid != this.state.pid) || (prevState.refresh !== this.state.refresh)) {
      fetch('/api/tasks/' + this.state.pid)
      .then(res => res.json())
      .then(tasks => this.setState({
        tasks: tasks,
        loading: false
      }));

      if (this.state.rates.length == 0) {
        let temp = [];
        fetch('/api/rates/' + this.props.pid)
        .then(res => res.json())
        .then((rates) => {
          rates.map((rate) => {
            temp[rate.rid] = rate;
          })
          this.setState({
            rates: temp,
          })
        });
      }

      if (this.state.ufactors.length == 0) {
        let temp = [];
        fetch('/api/factors/' + this.props.pid)
        .then(res => res.json())
        .then((ufactors) => {
          ufactors.map((ufactor) => {
            temp[ufactor.ufid] = ufactor;
          })
          this.setState({
            ufactors: temp,
          })
        });
      }
    }
  }

  render = () => {
    const { tasks, rates, ufactors } = this.state;
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Estimated Hours</th>
            <th>Confidence Factor</th>
            <th>Low Hours</th>
            <th>High Hours</th>
            <th>Ratecode</th>
            <th>Low Cost</th>
            <th>High Cost</th>
            <th>Assumptions</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.tasks.map((task) => {
              return(
                <tr>
                  <td>{task.tid}</td>
                  <td>{task.title}</td>
                  <td>{task.estimated_hours}</td>
                  <td>
                  {
                    (ufactors[task.ufid] !== undefined) ? <td>{ ufactors[task.ufid].title }</td> : <td></td>
                  }
                  </td>
                  <td>{task.hours_low}</td>
                  <td>{task.hours_high}</td>
                  {
                    (rates[task.rid] !== undefined) ? <td>{ rates[task.rid].role }</td> : <td></td>
                  }
                  <td>{task.rate_low}</td>
                  <td>{task.rate_high}</td>
                  <td>{task.assumptions}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

export default ProjectTasks;
