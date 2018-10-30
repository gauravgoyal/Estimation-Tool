import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Input,
  Table } from 'reactstrap';
import {RIEInput} from 'riek';
import AddRate from '../Modals/AddRate/';

class ProjectRates extends Component {

  render = () => {
    const { rates } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Rates</strong>
              </CardHeader>
              <Table>
                <thead>
                  <tr>
                    <th scope="row">#</th>
                    <th scope="row">Role</th>
                    <th scope="row">Resource Type</th>
                    <th scope="row">Role Type</th>
                    <th scope="row">Standard Rate</th>
                    <th scope="row">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rates.map((rate, index) => {
                      let key = index + 1;
                      let unique_key = 4 * key + 1;
                      return (
                        <tr key={`rate-${key}`}>
                          <th key={unique_key} scope="row">{ key }</th>
                          <td key={unique_key + 1}>
                            <RIEInput
                              value={rate.role}
                              change={this.props.handleChange.bind(this, index, 'role')}
                              propName='role'
                            >
                            </RIEInput>
                          </td>
                          <td key={unique_key + 2}>
                            <Input
                              type="select"
                              defaultValue={rate.resource_type}
                              onChange={this.props.handleChange.bind(this, index, 'resource_type')}
                              id='resource_type'
                              name='resource_type'
                            >
                              <option value="Acquia">Acquia</option>
                              <option value="Partner">Partner</option>
                            </Input>
                          </td>
                          <td key={unique_key + 3}>
                            <Input
                              type="select"
                              defaultValue={rate.role_type}
                              onChange={this.props.handleChange.bind(this, index, 'role_type')}
                              id='role_type'
                              name='role_type'
                              >
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="">Management</option>
                            </Input>
                          </td>
                          <td key={unique_key + 4}>$
                            <RIEInput
                                value={rate.rate}
                                change={this.props.handleChange.bind(this, index, 'rate')}
                                propName='rate'
                              >
                            </RIEInput>
                          </td>
                          <td key={unique_key + 5}>$
                            <RIEInput
                              value={rate.cost}
                              change={this.props.handleChange.bind(this, index, 'cost')}
                              propName='cost'
                            >
                            </RIEInput>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </Col>
          <AddRate onSubmit={this.props.submitForm.bind(this)} updateValue = { this.props.onUpdate.bind(this) }/>
        </Row>
      </div>
    )
  }
}

export default ProjectRates;
