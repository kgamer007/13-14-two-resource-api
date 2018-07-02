'use strict';

import faker from 'faker';
import Cat from '../../model/cat';

export default () => {
  const mockResouceToPost = {
    name: faker.lorem.words(2),
    someOtherPropery: 'lalala',
  };
  return new Cat(mockResouceToPost).save();
};
