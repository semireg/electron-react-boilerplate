import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type appStateType = {
  +counter: number,
  +tmpFile: string
};

export type Action = {
  +type: string
};

export type PathAction = Action & {
  +type: string,
  +path: string
};

export type GetState = () => appStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
