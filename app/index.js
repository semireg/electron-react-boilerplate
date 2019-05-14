import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { loadTmpFile } from './actions/tmpFile';
import log from 'electron-log';
import DetectFaces from './opencv/face';

const { ipcRenderer: ipc } = require('electron-better-ipc');

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

// This does not work because HAAR_FRONTALFACE_ALT2 is undefined... fix unknown.

// DetectFaces().then(tmpFile => {
//   log.info('finished DetectFaces');
//   store.dispatch(loadTmpFile(tmpFile));
// });

ipc.answerMain('tmpFile', tmpFile => {
  log.info(`answerMain tmpFile ${tmpFile}`);
  store.dispatch(loadTmpFile(tmpFile));
});
