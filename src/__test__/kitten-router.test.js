'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Cat from '../model/cat';
import Kitten from '../model/kitten';
import createMockDataPromise from './lib/kittenMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/kittens`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => {
  Promise.all([
    Cat.remove({}),
    Kitten.remove({}),
  ]);
});

describe('POST /api/kittens', () => {
  test('200 POST for succcesful posting of a kitten', () => {
    return createMockDataPromise()
      .then((mockData) => {
        const mockKitten = {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
          catId: mockData.catRoom._id,
        };

        return superagent.post(apiUrl)
          .send(mockKitten)
          .then((response) => {
            expect(response.status).toEqual(200);
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});

describe('GET /api/kittens', () => {
  test('200 GET for succesful fetching of a kitten', () => {
    return createMockDataPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/${mockData.Kitten._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
