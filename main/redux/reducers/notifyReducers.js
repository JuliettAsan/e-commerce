import { notifyTypes } from '../types/notifyTypes';

const initialState = {
  notify: {},
};

export const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case notifyTypes.createNotify:
      return {
        ...state,
        notify: action.payload,
      };
    default:
      return state;
  }
};
