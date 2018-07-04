'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Cat from '../model/cat';

const catRouter = new Router();

catRouter.post('/api/cats', (request, response, next) => {
  Cat.init()
    .then(() => {
      logger.log(logger.INFO, `CAT ROUTER BEFORE SAVE: Saved a new cat ${JSON.stringify(request.body)}`);
      return new Cat(request.body).save();
    })
    .then((newCat) => {
      logger.log(logger.INFO, `CAT ROUTER AFTER SAVE: Saved a new cat ${JSON.stringify(newCat)}`);
      return response.json(newCat);
    })
    .catch(next);
});

catRouter.get('/api/cats/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter and ID'));
  }

  Cat.init()
    .then(() => {
      return Cat.findOne({ _id: request.params.id });
    })
    .then((foundCat) => {
      logger.log(logger.INFO, `CAT ROUTER: FOUND THE MODEL, ${JSON.stringify(foundCat)}`);
      response.json(foundCat);
    })
    .catch(next);
  return undefined;
});

catRouter.put('/api/cats/:id?', (request, response, next) => {
  if (JSON.stringify(request.body).length <= 2) return next(HttpErrors(400, 'Not Found'));
  
  Cat.init()
    .then(() => {
      // error checking
      logger.log(logger.INFO, `CAT ROUTER BEFORE PUT: Updating cat ${JSON.stringify(request.body)}`);

      const options = {
        new: true,
        runValidators: true,
      };

      return Cat.findByIdAndUpdate(request.params.id, request.body, options);
    })
    .then((updatedCat) => {
      if (!updatedCat) return next(new HttpErrors(404, 'no cat has been found'));
      
      logger.log(logger.INFO, `MOVIE ROUTER AFTER PUT: Updated cat details ${JSON.stringify(updatedCat)}`);
      return response.json(updatedCat);
    })
    .catch(next);
  return undefined;
});

catRouter.delete('/api/cats/:id?', (request, response, next) => {
  Cat.init()
    .then(() => {
      logger.log(logger.INFO, `CAT ROUTER BEFORE DELETE: Deleting cat ${JSON.stringify(request.params)}`);

      return Cat.findOneAndRemove(request.params.id);
    })
    .then((data) => {
      return response.status(204).json(data);
    })
    .catch(next);
});

export default catRouter;
