import React, {Component} from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import ProjectUncertainityFactors from '../../project/components/ProjectUncertainityFactors';

class UncertainityFactors extends Component {

  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmitForm = (e) => {
    var formData = new URLSearchParams();
    formData.append('pid', this.props.pid);
    for (let key in this.state) {
      formData.append(key, this.state[key]);
    }

    // Call API to save Data.
    fetch("/api/factors", {
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>Uncertainity Factors</strong>
              </CardHeader>
              <ProjectUncertainityFactors refresh={this.state.modal} pid={ this.props.pid }/>
              <CardFooter>
                <Button
                  onClick={this.toggle.bind(this)}
                  size="sm" color="primary">
                  <i className="p-1 fa fa-dot-circle-o"></i> Add Uncertainity Factor
                </Button>
              </CardFooter>
              <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>Uncertainity Factors</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label htmlFor="title">Factor Title</Label>
                    <Input required onChange={this.updateValue.bind(this, 'title')} type="text" id="title" placeholder="Enter Factor Title (E.g. Scope is vague)"/>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="points">Factor Points</Label>
                        <Input required onChange={this.updateValue.bind(this, 'points')} type="number" id="points" placeholder="Enter Factor Points (E.g. 1 or 4)"/>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="lower_multiplier">Lower Multiplier</Label>
                        <Input required onChange={this.updateValue.bind(this, 'lower_multiplier')} type="number" step=".01" id="lower_multiplier" placeholder="Enter Lower estimate multiplier (E.g. 1 or 1.3)"/>
                      </FormGroup>
                    </Col>
                    <Col xs="12">
                      <FormGroup>
                        <Label htmlFor="heigher_multiplier">Heigher Multiplier</Label>
                        <Input required onChange={this.updateValue.bind(this, 'heigher_multiplier')} type="number" step=".01" id="heigher_multiplier" placeholder="Enter Heigher estimate multiplier (E.g. 1 or 1.3)"/>
                      </FormGroup>
                    </Col>
                  </FormGroup>
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

export default UncertainityFactors;
