// @flow
import { LOAD_PATH } from '../actions/tmpFile';
import type { PathAction } from './types';

export default function tmpFile(state: string = '', action: PathAction) {
  switch (action.type) {
    case LOAD_PATH:
      return action.path;
    default:
      return state;
  }
}
