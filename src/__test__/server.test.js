'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';

const apiUrl = `http://localhost:${process.env.PORT}/api//badpath`;

beforeAll(startServer);
afterAll(stopServer);

describe('this will catch all badpath', () => {
  test('404 on bad path', () => {
    return superagent.get(apiUrl)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});
