import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import { getGameQuestions } from '../services/triviaAPI';
import { prepareAnswersArray } from '../services/game';

import '../style/game.css';

class Game extends Component {
  state = {
    question: {},
    answers: [],
    index: 0,
    show: false,
    click: false,
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

  showResponse() {
    this.setState({
      show: true,
      click: true,
    });
  }

  nextAnswer() {
    this.componentDidMount();
    this.setState({
      show: false,
    });
  }

  render() {
    const { question, answers, show, click } = this.state;
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
          <p data-testid="header-player-name">
            { name }
          </p>
          <h3 data-testid="header-score"> placar:0 </h3>
        </div>

        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
        { (click)
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => this.nextAnswer() }
            >
              next
            </button>
          )}
        <div data-testid="answer-options">
          {
            answers.map((answer, index) => (
              <button
                type="button"
                className={ show
                    && (answer.isCorrect ? 'show answer-correct' : 'show answer-wrong') }
                key={ index }
                data-testid={ answer.testId }
                onClick={ () => this.showResponse() }
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
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.email,
});

export default connect(mapStateToProps)(Game);
