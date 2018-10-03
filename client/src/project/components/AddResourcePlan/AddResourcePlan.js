import React, {Component} from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';

// Import React Bootstrap Table
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



class AddResourcePlan extends Component {
  state = {
  };

  onSubmitForm = (e, form) => {
    e.preventDefault()
    this.setState({
      weeks: this.numberOfWeeks.value
    })
    this.props.onSubmitForm(this.numberOfWeeks.value)
  }

  render = () => {
    var weeks = this.state.weeks
    const { header, rows, rateOptions, cellEditProp, options, revenue, totalRevenue, noOfWeeks } = this.props
    let total = totalRevenue
    
    if (noOfWeeks > 5) {
      weeks = noOfWeeks;
    }

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
                <TableHeaderColumn dataField = "hours">Hours</TableHeaderColumn>
                <TableHeaderColumn dataField = "cost">Resource Cost</TableHeaderColumn>
                <TableHeaderColumn dataField = "listedRate">Listed Rate</TableHeaderColumn>
                <TableHeaderColumn dataField = "sellRate">Sell Rate</TableHeaderColumn>
                <TableHeaderColumn dataField = "totalCost">Cost</TableHeaderColumn>
                <TableHeaderColumn dataField = "listRev">List Revenue</TableHeaderColumn>
                <TableHeaderColumn dataField = "totalRev">Total Revenue</TableHeaderColumn>
              </BootstrapTable>
            </Col>
            <Col xs="12" sm="12" md="12" className="mt-3">
              <h2 className="text-center">Project Investment (DRB Format)</h2>
              <BootstrapTable className="mt-2" data={ total } striped hover >
                <TableHeaderColumn dataField='id' isKey={ true } autoValue={ true } hidden >Job ID</TableHeaderColumn>
                <TableHeaderColumn dataField="title">(EAC)</TableHeaderColumn>
                <TableHeaderColumn dataField="listRates">List Rates</TableHeaderColumn>
                <TableHeaderColumn dataField="actuals">Actuals</TableHeaderColumn>
                <TableHeaderColumn dataField="diffList">Differnece From List</TableHeaderColumn>
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
