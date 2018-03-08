import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Radar} from 'react-chartjs-2';
import {CardColumns, CardText, CardLink, Col, Card, CardHeader, CardBody} from 'reactstrap';

class Dashboard extends Component {

  state = {projects: []};

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(projects => this.setState({projects}));
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>Projects</h1>
        {this.state.projects.map((project) => {
          return (
            <Col xs="12" sm="6" md="4">
              <Card>
                <CardHeader>
                  {project.title}
                  <div className="card-actions">
                    <a onClick={this.props.addProject.bind(this, project)} href={`#/project/${project.pid}`}>
                      <small className="text-muted">View</small>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <CardText> Hello </CardText>
                    <CardLink onClick={this.props.addProject.bind(this, project)} href={`#/project/${project.pid}`}>View</CardLink>
                    <CardLink onClick={this.props.addProject.bind(this, project)} href={`#/project/${project.pid}/edit`}>Edit</CardLink>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
