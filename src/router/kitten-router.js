'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Kitten from '../model/kitten';

const kittenRouter = new Router();

kittenRouter.post('/api/kittens', (request, response, next) => {
  Kitten.init()
    .then(() => {
      logger.log(logger.INFO, `KITTEN ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Kitten(request.body).save();
    })
    .then((newKitten) => {
      logger.log(logger.INFO, `KITTEN ROUTER: POST AFTER SAVE: ${JSON.stringify(newKitten)}`);
      response.json(newKitten);
    })
    .catch(next);
});

kittenRouter.get('/api/kittens/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter and ID'));
  }

  Kitten.init()
    .then(() => {
      return Kitten.findOne({ _id: request.params.id });
    })
    .then((foundKitten) => {
      logger.log(logger.INFO, `KITTEN ROUTER: AFTER GETTING KITTEN ${JSON.stringify(foundKitten)}`);
      return response.json(foundKitten);
    })
    .catch(next);
  return undefined;
});

kittenRouter.put('/api/kittens/:id?', (request, response, next) => {
  if (JSON.stringify(request.body).length <= 2) return next(HttpErrors(400, 'Not found'));

  Kitten.init()
    .then(() => {
      logger.log(logger.INFO, `KITTEN ROUTER BEFORE PUT: Updating kitten ${JSON.stringify(request.body)}`);

      const options = {
        new: true,
        runValidators: true,
      };

      return Kitten.findByIdAndUpdate(request.params.id, request.body, options);
    })
    .then((updatedKitten) => {
      if (!updatedKitten) return next(new HttpErrors(404, 'no cat has been found'));
      logger.log(logger.INFO, `KITTEN ROUTER AFTER PUT: Updating kitten ${JSON.stringify(updatedKitten)}`);
      return response.json(updatedKitten);
    })
    .catch(next);
  return undefined;
});

kittenRouter.delete('/api/kittens/:id?', (request, response, next) => {
  Kitten.init()
    .then(() => {
      logger.log(logger.INFO, `KITTEN ROUTER BEFORE DELETE: Deleting kitten #${request.params.id}`);
      return Kitten.findByIdAndRemove(request.params.id);
    })
    .then((data) => {
      return response.status(204).json(data);
    })
    .catch(next);
});

export default kittenRouter;
