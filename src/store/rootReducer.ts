import { combineReducers } from 'redux';

import auth from '../reducers/auth';
import network from '../reducers/network';

const reducersList = {
  network,
  auth,
};

export default combineReducers(reducersList);
