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
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import ProjectList from '../../project/components/ProjectList';
import ProjectRates from '../../project/components/ProjectRates';

class Rates extends Component {

  state = {
    category: '',
    role: '',
    rate: '',
    modal: false
  };

  onSubmitForm = (e) => {
    var formData = new URLSearchParams();
    formData.append('pid', this.props.pid);
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
    this.toggle();
  };

  updateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {};
      data[field] = e.target.value;
      this.setState(data);
    }
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Rates</strong>
              </CardHeader>
              <ProjectRates refresh={this.state.modal} pid={ this.props.pid }/>
              <CardFooter>
                <Button
                  onClick={this.toggle.bind(this)}
                  size="sm" color="primary">
                  <i className="p-1 fa fa-dot-circle-o"></i> Add Rate
                </Button>
              </CardFooter>
              <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>Add Rate</ModalHeader>
                <ModalBody>
                  <Form onSubmit={this.onSubmitForm}>
                    <FormGroup>
                      <Label htmlFor="code">Code</Label>
                      <Input
                        required
                        onChange={this.updateValue.bind(this, 'code')}
                        type="text" id="code"
                        placeholder="Enter Code (E.g. BU)" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        required
                        onChange={this.updateValue.bind(this, 'category')}
                        type="text" id="category"
                        placeholder="Enter Category (E.g. Uncertainty buffer)" />
                    </FormGroup>
                    <FormGroup row>
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="role">Role</Label>
                          <Input
                            required
                            onChange={this.updateValue.bind(this, 'role')}
                            type="text"
                            id="role"
                            placeholder="Enter Role (E.g. Developer)" />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup>
                          <Label htmlFor="rate">Rate: (in USD)</Label>
                          <Input
                            required
                            onChange={this.updateValue.bind(this, 'rate')}
                            type="number"
                            id="rate"
                            placeholder="Enter Rate (E.g. 20)" />
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={this.onSubmitForm}
                    type="submit"
                    size="sm"
                    color="primary">
                    <i className="fa fa-dot-circle-o"></i> Submit
                  </Button>
                  <Button
                    onClick={this.toggle.bind(this)}
                    size="sm"
                    color="secondary">
                    <i className="fa fa-dot-circle-o"></i> Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Rates;
