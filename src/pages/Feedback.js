import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    this.checkassertions();
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('./');
  };

  checkassertions() {
    const { assertions } = this.props;
    const maxassertions = 3;

    if (assertions < maxassertions) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  }

  render() {
    const { message } = this.state;
    const { score, assertions } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">{message}</h1>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button type="button" onClick={ this.handleClick } data-testid="btn-play-again">
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
