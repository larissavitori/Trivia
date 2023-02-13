import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGameQuestions } from '../services/triviaAPI';
import { prepareAnswersArray, saveScore } from '../services/game';

import '../style/game.css';
import '../style/button.css';
import { calculateScore } from '../redux/actions';
import Timer from '../components/Timer';
import Header from '../components/Header';
import Logo from '../components/Logo';

class Game extends Component {
  state = {
    questions: [],
    question: {},
    answers: [],
    index: 0,
    show: false,
    timer: 30,
    click: false,
  };

  async componentDidMount() {
    const playerToken = localStorage.getItem('token');
    const questions = await getGameQuestions(playerToken);

    this.setState({ questions }, () => this.newQuestion());
    this.startTimer();
  }

  newQuestion() {
    const { questions, index } = this.state;
    const { history, score } = this.props;
    const maxQuestions = 5;

    if (this.checkResponse(questions)) {
      return false;
    }
    if (index === maxQuestions) {
      saveScore(score);
      history.push('/feedback');
      return;
    }

    this.setState({
      question: questions[index],
      answers: prepareAnswersArray(questions[index]),
      index: index + 1,
      timer: 30,
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

  showResponseAndCalculate(answer, timer) {
    const { score, dispatch } = this.props;
    const fixNumber = 10;
    const level = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const points = score + fixNumber + timer * level[answer.difficulty];
    this.setState({
      show: true,
      click: true,
    });
    if (answer.isCorrect) dispatch(calculateScore(points));
  }

  nextAnswer() {
    this.newQuestion();
    this.setState({
      show: false,
    });
  }

  render() {
    const { question, answers, show, timer, click } = this.state;
    return (
      <div>
        <Header />
        <div className="questions-container">
          <Logo />
          <div className="question">
            <div />
            <h2 data-testid="question-category" className="category">
              {question.category}
            </h2>
            <p data-testid="question-text">{question.question}</p>
            <h1 className="timer">
              <Timer timer={ timer } />
            </h1>
          </div>
          <div className="wrapper">
            <div data-testid="answer-options" className="options">
              {answers.map((answer, index) => (
                <button
                  type="button"
                  className={
                    show
                    && (answer.isCorrect ? 'answer-correct' : 'answer-wrong')
                  }
                  key={ index }
                  data-testid={ answer.testId }
                  disabled={ timer <= 0 }
                  onClick={ () => this.showResponseAndCalculate(answer, timer) }
                >
                  {answer.text}
                </button>
              ))}
            </div>
            {click && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.nextAnswer() }
                className="primary button"
              >
                next
              </button>
            )}
          </div>
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
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
