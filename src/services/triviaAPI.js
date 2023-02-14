const GAME_URL_BASE = 'https://opentdb.com/api.php?amount=5&token=';

export const getGameQuestions = async (playerToken) => {
  const response = await fetch(`${GAME_URL_BASE}${playerToken}`);
  const data = await response.json();
  const { results } = data;
  if (results.length === 0) {
    throw new Error('Algo de errado aconteceu');
  }
  return results;
};
