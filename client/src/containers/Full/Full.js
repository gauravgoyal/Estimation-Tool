import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Cookies from "universal-cookie";
import CryptoJS from 'crypto-js';

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

import Dashboard from '../../project/containers/Dashboard';
import AddProject from '../../project/containers/AddProject';
import GlobalRate from '../../project/containers/GlobalRates';
import Tabs from '../../project/containers/Tabs';
import Login from '../../project/components/Login';

import {
  userAuthenticationCheck,
  authenticateUser
} from '../../project/actions'

import config from '../../config';

class Full extends Component {
  onLogin = (name, pass) => {
    const {dispatch} = this.props;
    dispatch(userAuthenticationCheck(name, pass))
  }

  componentDidMount = () => {
    const {dispatch} = this.props;
    const cookies = new Cookies();
    var decryptText = cookies.get('isLoggedIn');
    if (decryptText !== undefined) {
      var access  = CryptoJS.AES.decrypt(decryptText, config.encryptText);
      access = access.toString(CryptoJS.enc.Utf8);
      if (access === 'true') {
        dispatch(authenticateUser(true));
      }
    }
  }
  
  render() {
    const createProjectItems = (projects) => {
      const project = projects[projects.length - 1];
      if (project !== undefined) {
        const item = {
          name: project.title,
          url: `/project/${project.pid}`,
          icon: 'icon-speedometer',
        };
        const oldItem = navigation.items[navigation.items.length - 1];
        if (oldItem.url !== item.url) {
          navigation.items.push(item);
        }
      }
    };

    if (this.props.viewedProjects) {
      createProjectItems(this.props.viewedProjects);
    }

    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
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
                  <Route path="/login" name="Login" component={Login} />
                  <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                  <Route path="/project/add" name="AddProject" component={AddProject} />
                  <Route path="/project/global-rates" name="GlobalRates" component={GlobalRate} />
                  <Route path="/project/:pid" name="Project" component={Tabs} />
                  <Redirect from="/" to="/dashboard" />
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
    else {
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
                <Login checkUser={this.onLogin.bind(this)}></Login>
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
}

const mapStateToProps = (state) => {
  const { viewedProjects, isLoggedIn } = state.projectOperations;
  return {
    viewedProjects,
    isLoggedIn
  };
};

export default connect(mapStateToProps)(Full);
