import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getGameQuestions } from '../services/triviaAPI';
import { prepareAnswersArray } from '../services/game';

class Game extends Component {
  state = {
    question: {},
    answers: [],
    index: 0,
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

  render() {
    const { question, answers } = this.state;

    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options">
          {
            answers.map((answer, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ answer.testId }
              >
                {answer.text}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
