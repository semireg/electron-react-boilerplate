import { systemPreferences, app as localApp, remote } from 'electron';
import log from 'electron-log';
import is from 'electron-is';
import cv, { HAAR_FRONTALFACE_ALT2 } from 'opencv4nodejs';
import fs from 'fs';
import path from 'path';
import tmp from 'tmp';

const app = (remote && remote.app) || localApp;

const DetectFaces = (): Promise<string> => {
  return new Promise(resolve => {
    if (!cv.xmodules.face) {
      throw new Error('exiting: opencv4nodejs compiled without face module');
    }

    log.info(`app location dir: ${app.getAppPath()}`);

    const opencvDataPath = is.dev()
      ? 'app/opencv/data'
      : path.join(path.dirname(app.getAppPath()), './opencv');

    const modelFile = `${opencvDataPath}/lbfmodel.yaml`;
    log.info(`modelFile: ${modelFile}`);

    if (!fs.existsSync(modelFile)) {
      log.info('could not find landmarks model');
      log.info(
        'download the model from: https://raw.githubusercontent.com/kurnianggoro/GSOC2017/master/data/lbfmodel.yaml'
      );
      throw new Error(
        `exiting: could not find landmarks model at ${modelFile}`
      );
    }

    console.log(cv);
    console.log(cv.haarCascades.HAAR_FRONTALFACE_ALT2);

    log.info(`HAAR_FRONTALFACE_ALT2: ${HAAR_FRONTALFACE_ALT2}`);
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    // create the facemark object with the landmarks model
    const facemark = new cv.FacemarkLBF();
    facemark.loadModel(modelFile);

    const image = cv.imread(`${opencvDataPath}/got.jpg`);
    const gray = image.bgrToGray();

    const faceClassifierOpts = {
      minSize: new cv.Size(30, 30),
      scaleFactor: 1.126,
      minNeighbors: 1
    };

    const faces = classifier.detectMultiScale(gray, faceClassifierOpts).objects;

    // use the detected faces to detect the landmarks
    const faceLandmarks = facemark.fit(gray, faces);

    for (let i = 0; i < faceLandmarks.length; i++) {
      const landmarks = faceLandmarks[i];
      for (let x = 0; x < landmarks.length; x++) {
        image.drawCircle(landmarks[x], 1, new cv.Vec(0, 255, 0), 1, cv.LINE_8);
      }
    }

    const tmpobj = tmp.fileSync({ postfix: '.png' });
    cv.imwrite(tmpobj.name, image);
    log.info(`resolving ${tmpobj.name}`);

    resolve(tmpobj.name);
  });
};

export default DetectFaces;
