import React, {Component} from 'react';
import {RIEInput} from 'riek';
import { Col, Table } from 'reactstrap';

class ProjectDetails extends Component {
  render = () => {
    const { project } = this.props;
    if (project.length === 0) {
      return <div>No data found</div>
    }
    else {
      return (
        <Col xs="12" sm="6" md="4">
          <Table bordered>
            <tbody>
              <tr>
                <th scope="row">Title</th>
                <td>
                  <RIEInput
                    value={project.title}
                    change={this.props.handleChange.bind(this, 'title')}
                    propName='title'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>
                  <RIEInput
                    value={project.description ? project.description : 'NA'}
                    change={this.props.handleChange.bind(this, 'description')}
                    propName='description'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">Creator</th>
                <td>
                  <RIEInput
                    value={project.creator ? project.creator : 'NA'}
                    change={this.props.handleChange.bind(this, 'creator')}
                    propName='creator'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">Owner</th>
                <td>
                  <RIEInput
                    value={project.owner ? project.owner : 'NA'}
                    change={this.props.handleChange.bind(this, 'owner')}
                    propName='owner'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">Reviewer</th>
                <td>
                  <RIEInput
                    value={project.reviewer ? project.reviewer : 'NA'}
                    change={this.props.handleChange.bind(this, 'reviewer')}
                    propName='reviewer'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">Signed By</th>
                <td>
                  <RIEInput
                    value={project.signer ? project.signer : 'NA'}
                    change={this.props.handleChange.bind(this, 'signer')}
                    propName='signer'>
                  </RIEInput>
                </td>
              </tr>
              <tr>
                <th scope="row">MavenkLink ID</th>
                <td>
                  <RIEInput
                    value={project.mlid ? project.mlid : 'NA'}
                    change={this.props.handleChange.bind(this, 'mlid')}
                    propName='mlid'>
                  </RIEInput>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      )
    }
  }
}

export default ProjectDetails;
