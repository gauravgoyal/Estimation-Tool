import React, {Component} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';

import Rates from '../../containers/Rates';
import UFactors from '../../containers/UFactors/';
import ProjectDetails from '../../containers/ProjectDetails';
import Tasks from '../../../views/Tasks/';

class ProjectTabs extends Component {

  state = {
    activeTab: 'project_details'
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
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
              className={classnames({ active: this.state.activeTab === 'project_tasks' })}
              href="#"
              onClick={ this.toggleTab.bind(this, 'project_tasks') }>
              Work Breakdown Structure (WBS)
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
            <Rates />
          </TabPane>
          <TabPane tabId="uncertainity_factors">
            <UFactors />
          </TabPane>
          <TabPane tabId="project_details">
            <ProjectDetails />
          </TabPane>
          <TabPane tabId="project_tasks">
            <Tasks />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ProjectTabs;
