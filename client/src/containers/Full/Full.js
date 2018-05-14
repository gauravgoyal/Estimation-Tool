import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';

import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';

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
    const createProjectItems = (projects) => {
      let project = projects[projects.length - 1];
      if (project !== undefined) {
        let item = {
          name: project.title,
          url: '/project/' + project.pid,
          icon: 'icon-speedometer'
        };
        let oldItem = navigation.items[navigation.items.length - 1];
        if (oldItem.url !== item.url) {
          navigation.items.push(item);
        }
      }
    };

    if (this.state.projects) {
      createProjectItems(this.state.projects);
    }

    return (
      <div className="app">
        <AppHeader fixed>
          <FullHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarNav navConfig={navigation} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" render={(props) => ( <Dashboard addProject={this.pushProject.bind(this)} />)}/>
                <Route path="/project/add" name="ProjectAdd" component={ProjectAdd}/>
                <Route path="/project/:pid" name="Project" component={Project}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <FullAside />
          </AppAside>
        </div>
        <AppFooter>
          <FullFooter />
        </AppFooter>
      </div>
    );
  }
}

export default Full;
