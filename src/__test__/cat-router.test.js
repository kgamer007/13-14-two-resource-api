'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Cat from '../model/cat';
import createMockCatPromise from './lib/catMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/cats`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Cat.remove({}));

describe('POST /api/cats', () => {
  const mockResource = {
    name: faker.name.firstName(2),
    cat: faker.name.lastName(2),
  };

  test.only('200 POST for successful post of a cat', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body.cat).toEqual(mockResource.cat);
        expect(response.body._id).toEqual(mockResource._id);
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('GET /api/cats', () => {
  test('200 GET for successful fetching of a cat', () => {
    let returnedCat;
    return createMockCatPromise()
      .then((newCat) => {
        returnedCat = newCat;
        return superagent.get(`${apiUrl}/${newCat._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(returnedCat.name);
        expect(response.body.cat).toEqual(returnedCat.cat);
      })
      .catch((err) => {
        throw err;
      });
  });
});
