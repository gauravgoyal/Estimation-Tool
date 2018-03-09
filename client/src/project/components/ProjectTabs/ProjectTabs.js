import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';

import Rates from '../../../views/Rates/';
import UncertainityFactors from '../../../views/UncertainityFactors/';
import ProjectDetails from '../ProjectDetails/';

class ProjectTabs extends Component {

  state = {
    activeTab: 'project_details',
    pid: ''
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid != this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }
  }

  componentDidMount = () => {
    if (this.state.pid == '') {
      this.setState({
        pid: this.props.pid
      })
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'project_details' })}
              href="#"
              onClick={ this.toggleTab.bind(this, 'project_details') }>
              Project Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'rates' })}
              href="#"
              onClick={ this.toggleTab.bind(this, 'rates') }>
              Rates
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'uncertainity_factors' })}
              href="#"
              onClick={ this.toggleTab.bind(this, 'uncertainity_factors') }>
              Uncertainity Factors
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="rates">
            <Rates pid={this.state.pid}  />
          </TabPane>
          <TabPane tabId="uncertainity_factors">
            <UncertainityFactors pid={this.state.pid} />
          </TabPane>
        </TabContent>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="project_details">
            <ProjectDetails pid={this.state.pid}  />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ProjectTabs;
