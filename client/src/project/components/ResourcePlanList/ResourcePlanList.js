import React, {Component} from 'react'
import {CardText, CardLink, Col, Card, Row, CardHeader, CardBody} from 'reactstrap';

class ResourcePlanList extends Component {
  render = () => {
    const { plans } = this.props
    return (
      <div className="animated fadeIn">
        <Row>
        {plans.map((plan, index) => {
          return (
            <Col xs="12" sm="6" md="4">
              <Card>
                <CardHeader>
                  <div>Resource Plan # {index}</div>
                </CardHeader>
                <CardBody>
                  <div className="card-actions">
                    <a onClick = {this.props.onClick.bind(this, plan)} href={`#/project/${plan.pid}/resource/${plan.res_id}`}>
                      <small className="text-muted">View</small>
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        </Row>
      </div>
    )
  }
}

export default ResourcePlanList
