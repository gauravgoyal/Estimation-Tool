import React, {Component} from 'react'
import { Button, Col, Form, FormGroup, Label, Input, Table } from 'reactstrap';

class AddResourcePlan extends Component {
  state = {}

  onSubmitForm = (e, form) => {
    e.preventDefault()
    this.setState({
      weeks: this.numberOfWeeks.value
    })
  }

  render = () => {
    const { weeks } = this.state
    const { defaultPlan } = this.props
    var header = [];
    var rows = {};
    defaultPlan.forEach(function (weeksData) {
      let week = weeksData.week_name + " (W" + weeksData.week + ")"
      header.push(week)
        weeksData.allocations.forEach((data) => {
          if (!rows[data.role]) {
            rows[data.role] = [];
            for (var i = 1; i < weeksData.week; i++) {
              rows[data.role].push(0)
            }
          }
          rows[data.role].push(data.hours);
        });
    });
    if (header.length !== weeks) {
      for (var i = header.length + 1; i <= weeks; i++) {
        header.push("W" + i)
      }
    }

    Object.keys(rows).map((data) => {
      if (rows[data].length !== weeks )
        var i = 1
        for (i; i <= weeks - rows[data].length; i = i++) {
          rows[data].push(0);
        }
    })
    console.log(rows);
    console.log(header);
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
            <Table className="table table-bordered">
              <thead>
                <tr>
                  <th></th>
                  {Object.keys(header).map((data, i) => <th key={i}>{header[data]}</th>)}
                </tr>
              </thead>
              <tbody>
                {Object.keys(rows).map((letter) =>
                    <tr>
                        <td>{letter}</td>
                        {rows[letter].map((data) => <td>{data}</td>)}
                    </tr>
                )}
              </tbody>
          </Table>
          </div>
        }
      </div>
    )
  }
}

export default AddResourcePlan
