import React, {Component} from 'react'
import { Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

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
          <div>Show resource plan</div>
        }
      </div>
    )
  }
}

export default AddResourcePlan
