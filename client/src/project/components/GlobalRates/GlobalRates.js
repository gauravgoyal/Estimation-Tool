import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  Table } from 'reactstrap';
import {RIEInput} from 'riek';
import AddRate from '../Modals/AddGlobalRates/';

class GlobalRates extends Component {

  render = () => {
    const { rates } = this.props;
    return (
      (rates.length) ?
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
                            <td key={unique_key + 2}>$
                              <RIEInput
                                  value={rate.rate}
                                  change={this.props.handleChange.bind(this, index, 'rate')}
                                  propName='rate'
                                >
                              </RIEInput>
                            </td>
                            <td key={unique_key + 3}>$
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
      : <div className="animated fadeIn">
          <div className="m-3 p-3"> 
            <div class="card text-center f-bold p-3"> Please Add Global rates</div>  
            <AddRate onSubmit={this.props.submitForm.bind(this)} updateValue = { this.props.onUpdate.bind(this) }/>
          </div>
        </div>
    )
  }
}

export default GlobalRates;
