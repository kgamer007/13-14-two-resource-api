import faker from 'faker';
import Kitten from '../../model/kitten';
import catMockPromise from './catMock';

export default () => {
  const mockData = {};
  return catMockPromise()
    .then((newCat) => {
      mockData.cat = newCat;
      /*
      mockData = {
        classRoom: {
          _id: 1342342354235235,
          name: some random words
        }
      }
      */
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
      /*
      mockData = {
        classRoom: {
          _id: 1342342354235235,
          name: some random words
          students: [235245425245245. some other student Id, ]
        },
        student: {
          first: something,
          last: something,
          _id: 235245425245245
          classRoomId: 1342342354235235,
        }
      }
      */
    })
    .catch((err) => {
      throw err;
    });
};
