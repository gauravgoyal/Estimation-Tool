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
          <FormGroup row>
            <Label for="discount" sm={1}>Discount</Label>
            <Col sm={3}>
              <Input type="text" name="discount" id="discount" placeholder="Enter discount"  onBlur= { this.props.onDiscount.bind(this) } />
            </Col>
          </FormGroup>
          <Row>
            <Col>
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
                    return <TableHeaderColumn width="150" dataField = {data.accessor}>{data.Header}</TableHeaderColumn>
                  }
                })
              }
            </BootstrapTable>
            </Col>
          </Row>
          <Row>
          <Col>
            <h2 className="text-center mt-2">Cost & Rate (Role Wise)</h2>
            <BootstrapTable className="mt-2" data={revenue} striped hover >
              <TableHeaderColumn isKey width="250" dataField = "role">Role</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "hours">Hours</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "cost">Resource Cost</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "listedRate">Listed Rate</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "sellRate">Sell Rate</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "totalCost">Cost</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "listRev">List Revenue</TableHeaderColumn>
              <TableHeaderColumn width="150" dataField = "totalRev">Total Revenue</TableHeaderColumn>
            </BootstrapTable>
            </Col>
          </Row>
          <Row>
          <Col>
            <h2 className="text-center mt-2">Project Investment (DRB Format)</h2>
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
