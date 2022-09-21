import { combineReducers } from 'redux';

import auth from '../reducers/auth';
import hospital from '../reducers/hospital';
import network from '../reducers/network';

const reducersList = {
  network,
  auth,
  hospital,
};

export default combineReducers(reducersList);
