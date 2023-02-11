import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  // componentDidMount() {
  //   const ONE_SECOND = 1000;
  //   setInterval(() => {
  //     this.setState((prevState) => ({
  //       timer: prevState.timer - 1,
  //     }));
  //   }, ONE_SECOND);
  // }

  // componentDidUpdate(_prevProps, prevState) {
  //   const { dispatch } = this.props;
  //   if (prevState.timer === 0) {
  //     dispatch(submitWrong());
  //   }
  // }

  render() {
    const { timer } = this.props;

    return <h3>{timer >= 0 ? timer : '0'}</h3>;
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
