import React, {Component} from 'react';
import {RIEInput} from 'riek';
import { Col, Table } from 'reactstrap';

class ProjectDetails extends Component {

  state = {
    pid: '',
    project: []
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid != this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.pid != this.state.pid) {
      fetch('/api/projects/' + this.state.pid)
      .then(res => res.json())
      .then((results) => {
        if (results.status == 200) {
          this.setState({
            project: results.result.pop()
          })
        }
      });
    }
  }

  handleChange = (field, newState) => {
    let project = this.state.project;
    project[field] = newState[field];

    // Update rates.
    var formData = new URLSearchParams();
    for (let key in project) {
      formData.append(key, project[key]);
    }

    fetch('/api/project/update/' + project.pid, {
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
          this.setState({
            project: project
          })
        }
      }
    )
  }

  render = () => {
    if (this.state.project.length == 0) {
      return <div>No data found</div>
    }
    else {
      return (
        <Col>
          <div className="project-details" sm="6">
            <Table>
              <tbody>
                <tr>
                  <th scope="row">Title</th>
                  <td>
                    <RIEInput
                      value={this.state.project.title}
                      change={this.handleChange.bind(this, 'title')}
                      propName='title'>
                    </RIEInput>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>
                    <RIEInput
                      value={this.state.project.description}
                      change={this.handleChange.bind(this, 'description')}
                      propName='description'>
                    </RIEInput>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Creator</th>
                  <td>
                    <RIEInput
                      value={this.state.project.creator}
                      change={this.handleChange.bind(this, 'creator')}
                      propName='creator'>
                    </RIEInput>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Owner</th>
                  <td>
                    <RIEInput
                      value={this.state.project.owner}
                      change={this.handleChange.bind(this, 'owner')}
                      propName='owner'>
                    </RIEInput>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Reviewer</th>
                  <td>
                    <RIEInput
                      value={this.state.project.reviewer}
                      change={this.handleChange.bind(this, 'reviewer')}
                      propName='reviewer'>
                    </RIEInput>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Signed By</th>
                  <td>
                    <RIEInput
                      value={this.state.project.signer}
                      change={this.handleChange.bind(this, 'signer')}
                      propName='signer'>
                    </RIEInput>
                  </td>
                </tr>
                <tr>
                  <th scope="row">MavenkLink ID</th>
                  <td>
                    <RIEInput
                      value={this.state.project.mlid}
                      change={this.handleChange.bind(this, 'mlid')}
                      propName='mlid'>
                    </RIEInput>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      )
    }
  }
}

export default ProjectDetails;
