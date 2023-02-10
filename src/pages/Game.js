import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import { getGameQuestions } from '../services/triviaAPI';
import { prepareAnswersArray } from '../services/game';

import '../style/game.css';
import { calculateScore } from '../redux/actions';

class Game extends Component {
  state = {
    question: {},
    answers: [],
    index: 0,
    show: false,
  };

  async componentDidMount() {
    const playerToken = localStorage.getItem('token');
    const questions = await getGameQuestions(playerToken);
    const { index } = this.state;

    if (this.checkResponse(questions)) {
      return false;
    }

    this.setState({
      question: questions[index],
      answers: prepareAnswersArray(questions[index]),
    });
  }

  checkResponse(questions) {
    const { history } = this.props;

    if (questions.length === 0) {
      localStorage.setItem('token', '');
      history.push('/');
      return true;
    }
  }

  showResponseAndCalculate(answer) {
    const { score, dispatch } = this.props;
    const fixNumber = 10;
    const level = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const points = score + fixNumber + 1 * level[answer.difficulty];
    this.setState({
      show: true,
    });
    if (answer.isCorrect) dispatch(calculateScore(points));
  }

  render() {
    const { question, answers, show } = this.state;
    const { name, email } = this.props;
    const hashGerada = md5(email).toString();
    const img = `https://www.gravatar.com/avatar/${hashGerada}`;

    return (
      <div>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ img }
            className="gravatar"
            alt="gravatar"
          />
          <p data-testid="header-player-name">{name}</p>
          <h3 data-testid="header-score"> placar:0 </h3>
        </div>

        <h2 data-testid="question-category">{question.category}</h2>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              className={
                show && (answer.isCorrect ? 'answer-correct' : 'answer-wrong')
              }
              key={ index }
              data-testid={ answer.testId }
              onClick={ () => this.showResponseAndCalculate(answer) }
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.email,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Game);
