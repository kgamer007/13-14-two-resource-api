import faker from 'faker';
import Kitten from '../../model/kitten';
import catMockPromise from './catMock';

export default () => {
  const mockData = {};
  return catMockPromise()
    .then((newCat) => {
      mockData.cat = newCat;
    })
    .then(() => {
      const mockKitten = {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        catId: mockData.cat._id,
      };
      return new Kitten(mockKitten).save();
    })
    .then((newKitten) => {
      mockData.kitten = newKitten;
      return mockData;
    })
    .catch((err) => {
      throw err;
    });
};
