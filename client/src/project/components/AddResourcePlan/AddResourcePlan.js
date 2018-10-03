import React, {Component} from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

// Import React Bootstrap Table
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



class AddResourcePlan extends Component {
  state = {};

  onSubmitForm = (e, form) => {
    e.preventDefault()
    this.setState({
      weeks: this.numberOfWeeks.value
    })
    this.props.onSubmitForm(this.numberOfWeeks.value)
  }

  render = () => {
    const { weeks } = this.state
    const { header, rows, rateOptions, cellEditProp, options, revenue, totalRevenue } = this.props
    let total = [totalRevenue]
    if (weeks) {
      let lastWeek = header.slice(-1).pop();
      let weekNumber = lastWeek.weekNumber;
      for (let i=1; i <= weeks - weekNumber; i++ ) {
        let tempHeader = {
          Header: "(W" + (weekNumber + i) + ")",
          accessor: "(W" + (weekNumber + i) + ")"
        }
        header.push(tempHeader)
      }
    }

    return (
      <div>
        {
          (weeks === undefined) ?
          <Form onSubmit={this.onSubmitForm.bind(this)}>
            <FormGroup row>
              <Label for="numberOfWeeks" sm={2}>Number of Weeks</Label>
              <Col sm={2}>
                <Input innerRef={(input) => (this.numberOfWeeks = input)} type="numberOfWeeks" name="numberOfWeeks" id="numberOfWeeks" placeholder="Enter Number of weeks" />
              </Col>
              <Col sm={2}>
                <Button type="submit">Create</Button>
              </Col>
            </FormGroup>
          </Form>
          :
          <div>
          <h2 className="text-center">Resource Plan</h2>
          <Row>
            <Col md="6">
              <label>Discount</label>
              <Input type="text" name="discount" id="discount"  onBlur= { this.props.onDiscount.bind(this) }></Input>
          </Col>
          </Row>
          <Row>
          <Col md="12">
            <BootstrapTable options = { options } data={rows} striped hover cellEdit={ cellEditProp } insertRow>
              {
                header.map((data) => {
                  if (data.accessor === 'role') {
                    return (
                      <TableHeaderColumn isKey width='300' dataField = {data.accessor} editable={ { type: 'select', options: { values: rateOptions } } }>
                        {data.Header}
                      </TableHeaderColumn>
                      )
                  }
                  else {
                    return <TableHeaderColumn dataField = {data.accessor}>{data.Header}</TableHeaderColumn>
                  }
                })
              }
            </BootstrapTable>
            </Col>
            <Col xs="12" sm="12" md="12" className="mt-3">
              <h2 className="text-center">Cost & Rate (Role Wise)</h2>
              <BootstrapTable className="mt-2" data={revenue} striped hover >
                <TableHeaderColumn isKey width="250" dataField = "role">Role</TableHeaderColumn>
                <TableHeaderColumn width="100" dataField = "hours">Hours</TableHeaderColumn>
                <TableHeaderColumn width="120" dataField = "cost">Resource Cost <small>(Per Hour)</small></TableHeaderColumn>
                <TableHeaderColumn width="140" dataField = "listedRate">Listed Rate <small>(Per Hour)</small></TableHeaderColumn>
                <TableHeaderColumn width="140" dataField = "sellRate">Sell Rate <small>(Per Hour)</small></TableHeaderColumn>
                <TableHeaderColumn width="80" dataField = "totalCost">Cost</TableHeaderColumn>
                <TableHeaderColumn width="120" dataField = "listRev">List Revenue</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField = "totalRev">Total Revenue</TableHeaderColumn>
              </BootstrapTable>
            </Col>
            <Col xs="12" sm="12" md="12" className="mt-3">
              <h2 className="text-center">Totals</h2>
              <BootstrapTable className="mt-2" data={ total } striped hover >
                <TableHeaderColumn width="150" isKey dataField = "hours">Total Hours</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="cost">Total Cost</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="revenue">Total Revenue</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="actual">Actual Revenue</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField="blendedMargin">Blended Margin</TableHeaderColumn>
              </BootstrapTable>
            </Col>
            </Row>
          </div>
        }
      </div>
    )
  }
}

export default AddResourcePlan
