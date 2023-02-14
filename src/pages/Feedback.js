import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../style/Feedback.css';
import { clearCurrentScore } from '../redux/actions';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    message: '',
    type: '',
  };

  componentDidMount() {
    this.checkassertions();
  }

  handleClick = (type) => {
    const { history, dispatch } = this.props;
    if (type === 'playAgain') {
      history.push('./');
      dispatch(clearCurrentScore());
    } else {
      history.push('./ranking');
      dispatch(clearCurrentScore());
    }
  };

  checkassertions() {
    const { assertions } = this.props;
    const maxassertions = 3;

    if (assertions < maxassertions) {
      this.setState({ message: 'Could be better...', type: 'bad' });
    } else {
      this.setState({ message: 'Well Done!', type: 'good' });
    }
  }

  render() {
    const { message, type } = this.state;
    const { score, assertions } = this.props;
    return (
      <div className="feedback">
        <div className="feedback-container">
          <Header />
          <h1 data-testid="feedback-text" className={ `message ${type}` }>
            {message}
          </h1>
          <p className="subtitle">
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
          </p>
          <p className="subtitle">
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </p>
        </div>

        <div className="wrapper">
          <button
            type="button"
            onClick={ () => this.handleClick('playAgain') }
            data-testid="btn-play-again"
            className="primary button"
          >
            Jogar Novamente
          </button>

          <button
            type="button"
            className="secondary button"
            onClick={ () => this.handleClick('ranking') }
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.email,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
