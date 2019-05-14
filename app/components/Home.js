// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {
  tmpFile: string
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        OpenCVExample
        {this.props.tmpFile.length > 0 && <img src={this.props.tmpFile} />}
      </div>
    );
  }
}
