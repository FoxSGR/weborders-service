import * as express from 'express';
import { Application } from 'express';
import { Container } from 'typedi';
import {
  MicroframeworkLoader,
  MicroframeworkSettings,
} from 'microframework-w3tec';
import * as path from 'path';
import favicon from 'serve-favicon';

import { env } from '../env';

export const publicLoader: MicroframeworkLoader = (
  settings: MicroframeworkSettings | undefined
) => {
  if (settings) {
    const dataDir = env.data.dir || path.join(__dirname, '..', 'data');
    Container.set('dataDir', dataDir);

    const expressApp: Application = settings.getData('express_app');
    expressApp
      // Serve static files like images from the public folder
      .use(
        express.static(path.join(__dirname, '..', 'public'), {
          maxAge: 31557600000,
        })
      )

      // Serve user resources
      .use(
        '/data',
        express.static(dataDir, {
          maxAge: 31557600000,
        })
      )

      // A favicon is a visual cue that client software, like browsers, use to identify a site
      .use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
  }
};
