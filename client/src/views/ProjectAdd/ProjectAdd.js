import React, {Component} from 'react';
import defaultRates from './_initialRate.js';

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
  Input,
} from 'reactstrap';

class ProjectAdd extends Component {

  state = {};

  onSubmitForm = () => {
    var formData = new URLSearchParams();
    for (let key in this.state) {
      formData.append(key, this.state[key]);
    }

    // Call API to save Data.
    fetch("/api/project", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.status === 200) {
        defaultRates.rates.map((defaultRate) => {
          defaultRate.pid = result.result;
          let rateFormData = new URLSearchParams();
          for (let key in defaultRate) {
            rateFormData.append(key, defaultRate[key]);
          }
          fetch("/api/rates", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: rateFormData
          })
        });
        window.location.href = '#/project/' + result.result.pop();
      }
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
                  <strong>Add New Project</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input onChange={this.updateValue.bind(this, 'title')}
                           type="text" id="title"
                           placeholder="Enter Project Title"/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input onChange={this.updateValue.bind(this, 'description')}
                           type="textarea" id="description"
                           placeholder="Enter Project Description"/>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="creator">Creator</Label>
                        <Input onChange={this.updateValue.bind(this, 'creator')}
                               type="text" id="creator"
                               placeholder="Enter Creator's Name"/>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="owner">Owner</Label>
                        <Input onChange={this.updateValue.bind(this, 'owner')}
                               type="text" id="owner"
                               placeholder="Enter Owner's Name"/>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="creator">Reviewer</Label>
                        <Input
                          onChange={this.updateValue.bind(this, 'reviewer')}
                          type="text" id="reviewer"
                          placeholder="Enter Reviewer's Name"/>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="rate">Signed of by</Label>
                        <Input onChange={this.updateValue.bind(this, 'signer')}
                               type="text" id="signer"
                               placeholder="Enter Signer's Name"/>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="mlid">MavenLink ID</Label>
                        <Input onChange={this.updateValue.bind(this, 'mlid')}
                               type="number" id="mlid"
                               placeholder="Enter MavenLink ID for the project"/>
                      </FormGroup>
                    </Col>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="type">Type</Label>
                        <Input onChange={this.updateValue.bind(this, 'type')}
                               type="select" id="type">
                          <option value="0">Fixed Rate</option>
                          <option value="1">Time and Money</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>


                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary"><i
                    className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProjectAdd;
