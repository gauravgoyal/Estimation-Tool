import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class FullFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href="http://coreui.io">
Estimation
          </a>
          {' '}
&copy; 2018 ACQUIA.
        </span>
        <span className="ml-auto">
Powered by
          <a href="https://reactjs.org/">
ReactJS
          </a>
        </span>
      </React.Fragment>
    );
  }
}

FullFooter.propTypes = propTypes;
FullFooter.defaultProps = defaultProps;

export default FullFooter;
