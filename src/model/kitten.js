'use strict';

import mongoose from 'mongoose';
import Cat from './cat';

const kittenSchema = mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  favoriteMilks: {
    type: String,
    default: 'Strawberry milk',
    enum: ['Strawberry milk', 'Chocolate milk', 'Vanilla milk', 'Rainbow milk'],
  },
  catId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'cats',
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';


export default mongoose.model('kittens', kittenSchema, 'kittens', skipInit);

function kittenPreHook(done) {
  // done is using an (error,data) signature
  // the value of 'contextual this' is the document
  return Cat.findById(this.catId)
    .then((foundCat) => {
      foundCat.kittens.push(this._id);
      return foundCat.save();
    })
    .then(() => done()) // done without any arguments mean success - save
    .catch(done); // done with results means an error - do not save
}

const kittenPostHook = (document, done) => {
  // document refers to the current instance of this kitten schema
  return Cat.findById(document.catRoomId)
    .then((foundCat) => {
      foundCat.kittens = foundCat.kittens.filter(kitten => kitten._id.toString() !== document._id.toString());
      return foundCat.save();
    })
    .then(() => done())
    .catch(done);
};

kittenSchema.pre('save', kittenPreHook);
kittenSchema.post('remove', kittenPostHook);
