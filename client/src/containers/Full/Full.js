import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux'

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

import Dashboard from '../../project/containers/Dashboard/';
import AddProject from '../../project/containers/AddProject/';
import Tabs from '../../project/containers/Tabs/';

class Full extends Component {

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

    if (this.props.viewedProjects) {
      createProjectItems(this.props.viewedProjects);
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
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/project/add" name="AddProject" component={AddProject}/>
                <Route path="/project/:pid" name="Project" component={Tabs}/>
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

const mapStateToProps = state => {
  const { viewedProjects} = state.projectOperations
  return {
    viewedProjects
  }
}

export default connect(mapStateToProps)(Full)
