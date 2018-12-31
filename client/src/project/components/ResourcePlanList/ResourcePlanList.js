import React, {Component} from 'react'
import { Col, Card, Row, CardHeader, CardBody} from 'reactstrap';

class ResourcePlanList extends Component {
  render = () => {
    const { plans } = this.props
    if (plans.length <= 0) {
      return (
        <div className="animated fadeIn">
          <h3>No resource plan found. Please add a resource plan.</h3>
        </div>
      )
    }
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
                    <a onClick = {this.props.onClick.bind(this, plan)}>
                      <small className="text-muted">View</small>
                    </a>
                  </div>
                </CardBody>
                <div className={plan.lock === 1 ? "approved-plan plan" : "closed-plan plan" }></div>
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
