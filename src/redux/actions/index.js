export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SUBMIT_CORRECT = 'SUBMIT_CORRECT';
export const SUBMIT_WRONG = 'SUBMIT_WRONG';

export const saveProfile = (profile) => ({
  type: SAVE_PROFILE,
  payload: profile,
});

export const submitCorrect = () => ({
  type: SUBMIT_CORRECT,
});

export const submitWrong = () => ({
  type: SUBMIT_WRONG,
});
