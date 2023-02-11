import { CALCULATE_SCORE, SAVE_PROFILE } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  score: 0,
  hits: 0,
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
      hits: state.hits + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
