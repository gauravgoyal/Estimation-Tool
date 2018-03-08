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

import Rates from '../../../views/Rates/';
import UncertainityFactors from '../../../views/UncertainityFactors/';

class ProjectTabs extends Component {

  state = {
    activeTab: 'rates',
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
            <NavLink href="#" onClick={ this.toggleTab.bind(this, 'rates') }>Rates</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={ this.toggleTab.bind(this, 'uncertainity_factors') }>Uncertainity Factors</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="rates">
            <Rates pid={this.props.pid}  />
          </TabPane>
          <TabPane tabId="uncertainity_factors">
            <UncertainityFactors pid={this.props.pid} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ProjectTabs;
