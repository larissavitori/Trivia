import { CALCULATE_SCORE, CLEAR_CURRENT_SCORE, SAVE_PROFILE } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PROFILE:
    return {
      ...state,
      token: action.payload.token,
      name: action.payload.playerName,
      email: action.payload.playerEmail,
    };
  case CALCULATE_SCORE:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  case CLEAR_CURRENT_SCORE:
    return {
      ...state,
      score: 0,
    };

  default:
    return state;
  }
};

export default playerReducer;
