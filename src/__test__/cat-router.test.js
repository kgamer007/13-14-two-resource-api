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
    name: faker.name.firstName(),
    cat: 'Green cat',
  };

  test('200 POST for successful post of a cat', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body.cats).toBe(mockResource.cat);
        expect(response.body._id).toBeTruthy();
      })
      .catch((err) => {
        throw err;
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

  test('404 GET no such cat exists', () => {
    return superagent.get(`${apiUrl}/12345`)
      .then((result) => {
        throw result;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});

describe('PUT request to /api/cats', () => {
  test('200 PUT was sucessfully updated with another cat', () => {
    return createMockCatPromise()
      .then((response) => {
        return superagent.put(`${apiUrl}/${response._id}`)
          .send({ name: 'Green cat' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Green cat');
      });
  });

  test('404 PUT no id was found with this request', () => {
    const mockCatUpdate = {
      name: 'Hello kitty',
      cat: 'Green cat',
    };
  
    return superagent.put(`${apiUrl}/notAvailable`)
      .send(mockCatUpdate)
      .then((results) => {
        throw results;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});

describe('DELETE requests to api/cats', () => {
  test('204 DELETE for successful deleting of cat', () => {
    let mockCatForDelete;
    return createMockCatPromise()
      .then((cat) => {
        mockCatForDelete = cat;
        return superagent.delete(`${apiUrl}/${mockCatForDelete._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(204);
      })
      .catch();
  });
});
