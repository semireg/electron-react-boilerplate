// @flow

import * as FontManager from 'font-manager';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const fonts = JSON.stringify(FontManager.getAvailableFontsSync());

    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
        <span>
          {fonts}
        </span>
      </div>
    );
  }
}
