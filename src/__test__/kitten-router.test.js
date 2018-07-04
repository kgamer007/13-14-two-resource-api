'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Cat from '../model/cat';
import Kitten from '../model/kitten';
import createMockKittenPromise from './lib/kittenMock';

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
    return createMockKittenPromise()
      .then((mockData) => {
        const mockKitten = {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
          catId: mockData.cat._id,
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

  test('POST - It should respond with a 400 status ', () => {
    return superagent.post(apiUrl)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(400);
      });
  });
});

describe('GET /api/kittens', () => {
  test('200 GET for succesful fetching of a kitten', () => {
    return createMockKittenPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/${mockData.kitten._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('404 GET, where is this cat that you are requesting', () => {
    return superagent.get(`${apiUrl}/12345`)
      .then((result) => {
        throw result;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});

describe('PUT requests to /api/cats', () => {
  test('STORE-ROUTER: 200 status code in creation', () => {
    let kitten;
    return createMockKittenPromise()
      .then((kittenMock) => {
        kitten = kittenMock.kitten; // eslint-disable-line
        return superagent.put(`${apiUrl}/${kittenMock.kitten._id}`)
          .send({ favoriteMilks: 'cats' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.catId).toEqual(kitten.catId.toString());
        // expect(response.body.last).toEqual(idUpdate.last);
      });
  });

  test('404 PUT no id was found with this request', () => {
    const mockKittenUpdate = {
      name: 'Hello kitty',
      cat: 'Green cat',
      id: '11122',
    };
  
    return superagent.put(`${apiUrl}/notAvailable`)
      .send(mockKittenUpdate)
      .then((results) => {
        throw results;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});
