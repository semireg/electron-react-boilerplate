import type { GetState, Dispatch } from '../reducers/types';

export const LOAD_PATH = 'LOAD_PATH';

export function loadTmpFile(tmpFile: string) {
  return {
    type: LOAD_PATH,
    path: tmpFile
  };
}
