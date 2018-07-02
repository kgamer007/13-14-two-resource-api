'use strict';

import faker from 'faker';
import Cat from '../../model/cat';

export default () => {
  const mockResouceToPost = {
    name: faker.lorem.words(2),
    cat: faker.lorem.words(2),
  };
  return new Cat(mockResouceToPost).save();
};
