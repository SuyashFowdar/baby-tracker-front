import { combineReducers } from 'redux';
import measures from './measures';
import token from './token';

export default combineReducers({ measures, token });
