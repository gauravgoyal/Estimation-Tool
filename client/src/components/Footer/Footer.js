import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <span><a href="#">Estimation</a> &copy; 2018 ACQUIA.</span>
        <span className="ml-auto">Powered by <a href="https://reactjs.org/">ReactJS</a></span>
      </footer>
    )
  }
}

export default Footer;
