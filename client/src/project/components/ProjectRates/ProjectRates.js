import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Table } from 'reactstrap';
import {RIEInput} from 'riek';

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
                    <th scope="row">Code</th>
                    <th scope="row">Category</th>
                    <th scope="row">Role</th>
                    <th scope="row">Rate</th>
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
                          <td key={unique_key + 4}>
                            <RIEInput
                              value={rate.code}
                              change={this.props.handleChange.bind(this, index, 'code')}
                              propName='code'
                            >
                            </RIEInput>
                          </td>
                          <td key={unique_key + 1}>
                            <RIEInput
                              value={rate.category}
                              change={this.props.handleChange.bind(this, index, 'category')}
                              propName='category'
                            >
                            </RIEInput>
                          </td>
                          <td key={unique_key + 2}>
                            <RIEInput
                              value={rate.role}
                              change={this.props.handleChange.bind(this, index, 'role')}
                              propName='role'
                            >
                            </RIEInput>
                          </td>
                          <td key={unique_key + 3}>$
                            <RIEInput
                                value={rate.rate}
                                change={this.props.handleChange.bind(this, index, 'rate')}
                                propName='rate'
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
        </Row>
      </div>
    )
  }
}

export default ProjectRates;
