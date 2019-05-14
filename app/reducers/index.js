// @flow
import { combineReducers } from 'redux';
import counter from './counter';
import tmpFile from './tmpFile';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    counter,
    tmpFile
  });
}
