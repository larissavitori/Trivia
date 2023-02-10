import { SAVE_PROFILE, SUBMIT_CORRECT, SUBMIT_WRONG } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PROFILE:
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.playerName,
      email: action.payload.playerEmail,
    };

  case SUBMIT_CORRECT:
    return {
      ...state,
      points: state.points + 1,
      questionNumber: state.questionNumber + 1,
    };

  case SUBMIT_WRONG:
    return {
      ...state,
      questionNumber: store.getState(questionNumber) + 1,
    };
  default:
    return state;
  }
};

export default player;
