import { combineReducers } from 'redux';

import auth from '../reducers/auth';
import company from '../reducers/company';
import network from '../reducers/network';

const reducersList = {
  network,
  auth,
  company,
};

export default combineReducers(reducersList);
