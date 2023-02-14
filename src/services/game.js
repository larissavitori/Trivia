import md5 from 'crypto-js/md5';
import store from '../redux';

const shuffleAnswersObject = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const prepareAnswersArray = (question) => {
  const answers = [question.correct_answer, ...question.incorrect_answers];
  const answersObject = answers.map((answer, index) => ({
    text: answer,
    isCorrect: index === 0,
    testId: !index ? 'correct-answer' : `wrong-answer-${index - 1}`,
    difficulty: question.difficulty,
  }));
  const shuffledAnswers = shuffleAnswersObject(answersObject);
  return shuffledAnswers;
};

const addNewScore = (playerScore) => {
  const currentRanking = JSON.parse(localStorage.getItem('ranking'));
  return [...currentRanking, playerScore];
};

const sortRanking = (scores) => scores.sort((a, b) => b.score - a.score);

const getImageCode = () => {
  const hashGerada = md5(store.getState().player.email).toString();
  const img = `https://www.gravatar.com/avatar/${hashGerada}`;
  return img;
};

export const saveScore = (score) => {
  const playerId = localStorage.getItem('token');
  const playerScore = {
    score,
    id: playerId,
    name: store.getState().player.name,
    image: getImageCode(),
  };
  if (localStorage.getItem('ranking') === null) {
    localStorage.setItem('ranking', JSON.stringify([playerScore]));
    return true;
  }
  const unsortedNewRanking = addNewScore(playerScore);
  const sortedNewRanking = sortRanking(unsortedNewRanking);
  localStorage.setItem('ranking', JSON.stringify(sortedNewRanking));
};
