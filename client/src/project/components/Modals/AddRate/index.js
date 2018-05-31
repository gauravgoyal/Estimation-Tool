import React, {Component} from 'react';
import {
  Col,
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

class AddRate extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render = () => {
    return (
      <Col>
        <Button
          onClick={this.toggle.bind(this)}
          size="sm" color="primary">
          <i className="p-1 fa fa-dot-circle-o"></i> Add Rate
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
          <ModalHeader toggle={this.toggle.bind(this)}>Add Rate</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.props.onSubmit}>
              <FormGroup>
                <Label htmlFor="code">Code</Label>
                <Input
                  required
                  onChange={this.props.updateValue.bind(this, 'code')}
                  type="text" id="code"
                  placeholder="Enter Code (E.g. BU)" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="category">Category</Label>
                <Input
                  required
                  onChange={this.props.updateValue.bind(this, 'category')}
                  type="text" id="category"
                  placeholder="Enter Category (E.g. Uncertainty buffer)" />
              </FormGroup>
              <FormGroup row>
                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      required
                      onChange={this.props.updateValue.bind(this, 'role')}
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
                      onChange={this.props.updateValue.bind(this, 'rate')}
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
              onClick={this.props.onSubmit}
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
      </Col>
    )
  }
}

export default AddRate;
