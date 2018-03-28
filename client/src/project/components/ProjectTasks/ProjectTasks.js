import React, {Component} from 'react';
import { Table, Input } from 'reactstrap';
import {RIEInput, RIESelect, RIETextArea} from 'riek';

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
    let factorOptions = [];
    ufactors.map(factor => {
      let data = {
        id: factor.ufid,
        text: factor.title,
      }
      factorOptions.push(data);
    })
    return (
      <Table className="task-table">
        <thead>
          <tr>
            <th className="title">Title</th>
            <th className="estimated-hours">Estimated Hours</th>
            <th className="conf-factor">Confidence Factor</th>
            <th className="low-hours">Low Hours</th>
            <th className="high-hours">High Hours</th>
            <th className="ratecode">Ratecode</th>
            <th className="low-cost">Low Cost</th>
            <th className="high-cost">High Cost</th>
            <th className="assumptions">Assumptions</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.tasks.map((task, index) => {
              return(
                <tr>
                  <td className="title">
                    <RIEInput
                      value={task.title}
                      change={this.handleChange.bind(this, index, 'title')}
                      propName='title'>
                    </RIEInput>
                  </td>
                  <td className="estimated-hours">
                    <RIEInput
                      value={task.estimated_hours}
                      change={this.handleChange.bind(this, index, 'estimated_hours')}
                      propName='estimated_hours'>
                    </RIEInput>
                  </td>
                  <td className="conf-factor">
                  {
                    (ufactors[task.ufid] !== undefined && factorOptions.length !== 0) ?
                    <Input
                      required
                      type="select"
                      defaultValue={task.ufid}
                      name="ufid"
                      id="ufid"
                      onChange={this.handleChange.bind(this, index, 'ufid')}
                    >
                      {ufactors.map((factor) => {
                        return <option key={ factor.ufid } value={ factor.ufid }>{ factor.title }</option>
                      })}
                    </Input> : <span></span>
                  }
                  </td>
                  <td className="low-hours">{task.hours_low}</td>
                  <td className="high-hours">{task.hours_high}</td>
                  <td className="ratecode">
                    {
                      (rates[task.rid] !== undefined) ?
                      <Input
                        required
                        type="select"
                        defaultValue={task.rid}
                        name="rid"
                        id="rid"
                        onChange={this.handleChange.bind(this, index, 'rid')}
                      >
                      {rates.map((rate) => {
                        return <option key={ rate.rid } value={ rate.rid }>{ rate.role }</option>
                      })}
                      </Input> : <span></span>
                    }
                  </td>
                  <td className="low-cost">{task.rate_low}</td>
                  <td className="high-cost">{task.rate_high}</td>
                  <td className="assumptions">
                    <RIETextArea
                      value = {task.assumptions}
                      change={this.handleChange.bind(this, index, 'assumptions')}
                      propName="assumptions"
                      cols="30"
                    >
                    </RIETextArea>
                  </td>
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
