// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
