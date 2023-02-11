import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    this.checkHits();
  }

  checkHits() {
    const { hits } = this.props;
    const maxHits = 3;

    if (hits < maxHits) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1 data-testid="feedback-text">{message}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hits: state.player.hits,
});

Feedback.propTypes = {
  hits: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
