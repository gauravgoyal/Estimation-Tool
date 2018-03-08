import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import ProjectAdd from '../../views/ProjectAdd/';
import Project from '../../views/Project/';

class Full extends Component {
  state = {
    projects: []
  }

  pushProject = (project, e) => {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects : projects
    })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} projects={this.state.projects}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" render={(props) => ( <Dashboard addProject={this.pushProject.bind(this)} />)}/>
                <Route path="/project/add" name="ProjectAdd" component={ProjectAdd}/>
                <Route path="/project/:pid" name="Project" component={Project}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
