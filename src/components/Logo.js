import React, { Component } from 'react';
import logo from '../images/logo.png';

class Logo extends Component {
  render() {
    return <img src={ logo } alt="logo" className="logo" />;
  }
}

export default Logo;
