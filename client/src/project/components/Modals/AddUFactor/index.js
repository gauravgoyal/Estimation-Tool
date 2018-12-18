import React, {Component} from 'react';
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class AddUFactor extends Component {
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
          <ModalHeader toggle={this.toggle.bind(this)}>Uncertainity Factors</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="title">Factor Title</Label>
              <Input required onChange={this.props.updateValue.bind(this, 'title')} type="text" id="title" placeholder="Enter Factor Title (E.g. Scope is vague)"/>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="points">Factor Points</Label>
                  <Input required onChange={this.props.updateValue.bind(this, 'points')} type="number" id="points" placeholder="Enter Factor Points (E.g. 1 or 4)"/>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="lower_multiplier">Lower Multiplier</Label>
                  <Input required onChange={this.props.updateValue.bind(this, 'lower_multiplier')} type="number" step=".01" id="lower_multiplier" placeholder="Enter Lower estimate multiplier (E.g. 1 or 1.3)"/>
                </FormGroup>
              </Col>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="heigher_multiplier">Higher Multiplier</Label>
                  <Input required onChange={this.props.updateValue.bind(this, 'heigher_multiplier')} type="number" step=".01" id="heigher_multiplier" placeholder="Enter Heigher estimate multiplier (E.g. 1 or 1.3)"/>
                </FormGroup>
              </Col>
            </FormGroup>
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

export default AddUFactor;
