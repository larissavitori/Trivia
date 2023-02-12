import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/Feedback.css';

class Feedback extends Component {
  state = {
    message: '',
    type: '',
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
          <h1 data-testid="feedback-text" className={ `message ${type}` }>
            {message}
          </h1>
          <p className="subtitle">
            Você acertou
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            questões!
          </p>
          <p className="subtitle">
            Um total de
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            pontos
          </p>
        </div>

        <div className="wrapper">
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-play-again"
            className="primary button"
          >
            Jogar Novamente
          </button>

          <button
            type="button"
            className="secondary button"
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
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
