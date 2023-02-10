import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import { getGameQuestions } from '../services/triviaAPI';
import { prepareAnswersArray } from '../services/game';

import '../style/game.css';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    question: {},
    answers: [],
    index: 0,
    show: false,
    timer: 30,
  };

  async componentDidMount() {
    const playerToken = localStorage.getItem('token');
    const questions = await getGameQuestions(playerToken);
    const { index } = this.state;

    if (this.checkResponse(questions)) {
      return false;
    }

    this.startTimer();
    this.setState({
      question: questions[index],
      answers: prepareAnswersArray(questions[index]),
    });
  }

  startTimer() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
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
    });
  }

  render() {
    const { question, answers, show, timer } = this.state;
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
        <Timer timer={ timer } />
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text">{ question.question }</p>
        <div data-testid="answer-options">
          {
            answers.map((answer, index) => (
              <button
                type="button"
                className={ show
                  && (answer.isCorrect ? 'show answer-correct' : 'show answer-wrong') }
                key={ index }
                data-testid={ answer.testId }
                disabled={ timer <= 0 }
                onClick={ ({ target: { className } }) => this.showResponse(className) }
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
  name: state.player.name,
  email: state.player.email,
});

export default connect(mapStateToProps)(Game);
