import { SAVE_PROFILE } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
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
  default:
    return state;
  }
};

export default playerReducer;
