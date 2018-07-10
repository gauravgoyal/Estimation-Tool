import React, {Component} from 'react';
import { Table, Input } from 'reactstrap';
import {RIEInput, RIETextArea} from 'riek';
import AddTask from '../Modals/AddTask/';

class ProjectTasks extends Component {

  render = () => {
    const { tasks, rates, ufactors, projectTotal} = this.props
    return (
      <div>
        <Table className="task-table">
          <thead>
            <tr>
              <th className="title">Title</th>
              <th className="estimated-hours">Estimated Hours</th>
              <th className="conf-factor">Confidence Factor</th>
              <th className="low-hours">Low Hours</th>
              <th className="high-hours">High Hours</th>
              <th className="ratecode">Role</th>
              <th className="low-cost">Low Cost</th>
              <th className="high-cost">High Cost</th>
              <th className="assumptions">Assumptions</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.map((task, index) => {
                return(
                  <tr>
                    <td className="title">
                      <RIEInput
                        value={task.title}
                        change={this.props.handleChange.bind(this, index, 'title')}
                        propName='title'>
                      </RIEInput>
                    </td>
                    <td className="estimated-hours">
                      <RIEInput
                        value={task.estimated_hours}
                        change={this.props.handleChange.bind(this, index, 'estimated_hours')}
                        propName='estimated_hours'>
                      </RIEInput>
                    </td>
                    <td className="conf-factor">
                    {
                      (ufactors.length > 0) ?
                      <Input
                        required
                        type="select"
                        defaultValue={task.ufid}
                        name="ufid"
                        id="ufid"
                        onChange={this.props.handleChange.bind(this, index, 'ufid')}
                      >
                        {ufactors.map((factor) => {
                          return <option key={ factor.ufid } value={ factor.ufid }>{ factor.title } - [{factor.points}]</option>
                        })}
                      </Input> : <span></span>
                    }
                    </td>
                    <td className="low-hours">{task.hours_low}</td>
                    <td className="high-hours">{task.hours_high}</td>
                    <td className="ratecode">
                      {
                        (rates.length > 0) ?
                        <Input
                          required
                          type="select"
                          defaultValue={task.rid}
                          name="rid"
                          id="rid"
                          onChange={this.props.handleChange.bind(this, index, 'rid')}
                        >
                        {rates.map((rate) => {
                          return <option key={ rate.rid } value={ rate.rid }>{ rate.role }</option>
                        })}
                        </Input> : <span></span>
                      }
                    </td>
                    <td className="low-cost">${task.rate_low}</td>
                    <td className="high-cost">${task.rate_high}</td>
                    <td className="assumptions">
                      <RIETextArea
                        value = {(task.assumptions === '') ? "No assumptions!" : task.assumptions}
                        change={this.props.handleChange.bind(this, index, 'assumptions')}
                        propName="assumptions"
                        cols="20"
                      >
                      </RIETextArea>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <th className="title">Totals</th>
              <th className="estimated-hours">{projectTotal.estimated_hours}</th>
              <th className="conf-factor"></th>
              <th className="low-hours">{projectTotal.low_estimated_hours}</th>
              <th className="high-hours">{projectTotal.high_estimated_hours}</th>
              <th className="ratecode"></th>
              <th className="low-cost">${projectTotal.low_estimated_cost}</th>
              <th className="high-cost">${projectTotal.high_estimated_cost}</th>
              <th className="assumptions"></th>
            </tr>
          </tfoot>
        </Table>
        <AddTask
          rates = { rates }
          ufactors = { ufactors }
          handleData={ this.props.onHandleData }
          handleProjectHours = {this.props.onProjectHours }
          handleProjectRates = { this.props.onProjectRates }
          submitForm = { this.props.onSubmitForm }
        />
      </div>
    )
  }
}

export default ProjectTasks;
