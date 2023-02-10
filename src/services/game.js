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
