import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import ProjectList from '../../project/components/ProjectList';
import ProjectRates from '../../project/components/ProjectRates';

class Rates extends Component {

  state = {
    category: '',
    role: '',
    rate: '',
    pid: ''
  };

  onSubmitForm = (e) => {
    var formData = new URLSearchParams();
    for (let key in this.state) {
      formData.append(key, this.state[key]);
    }

    // Call API to save Data.
    fetch("/api/rates", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
  };

  updateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {};
      data[field] = e.target.value;
      this.setState(data);
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <Form onSubmit={this.onSubmitForm}>
                <CardHeader>
                  <strong>Rates</strong>
                  <small>Global</small>
                </CardHeader>
                <CardBody>
                  <ProjectList onChange={this.updateValue.bind(this, 'pid')}/>
                  <FormGroup>
                    <Label htmlFor="category">Category</Label>
                    <Input onChange={this.updateValue.bind(this, 'category')} type="text" id="category" placeholder="Enter Category (E.g. Uncertainty buffer)"/>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="role">Role</Label>
                        <Input onChange={this.updateValue.bind(this, 'role')} type="text" id="role" placeholder="Enter Role (E.g. Developer)"/>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="rate">Rate: (in USD)</Label>
                        <Input onChange={this.updateValue.bind(this, 'rate')} type="text" id="rate" placeholder="Enter Rate (E.g. 20)"/>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <ProjectRates pid={ this.state.pid }/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Rates;
