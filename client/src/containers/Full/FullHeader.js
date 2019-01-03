import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class FullHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: `${process.env.PUBLIC_URL}img/acquia.png`, width: 89, height: 25, alt: 'Acquia Logo',
          }}
          minimized={{
            src: `${process.env.PUBLIC_URL}img/acquia.png`, width: 30, height: 30, alt: 'Acquia Logo',
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar />
        <Nav className="ml-auto" navbar />
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

FullHeader.propTypes = propTypes;
FullHeader.defaultProps = defaultProps;

export default FullHeader;
