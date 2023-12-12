import { notifyTypes } from '../types/notifyTypes';

export const createNotify = (state) => ({
  type: notifyTypes.createNotify,
  payload: state,
});
