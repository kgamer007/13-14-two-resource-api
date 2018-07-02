'use strict';

import mongoose from 'mongoose';
// MongoDB is nonrelational, NoSQL databse
// validation purposes
const catSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  kittens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'kittens',
    },
  ],
  teacher: {
    type: String,
    default: 'RainbowCat',
    enum: ['GreenCat', 'BlueCat', 'RedCat', 'RainbowCat'],
  },
}, { timestamps: true });

catSchema.pre('findOne', function preHookCallback(done) {
  this.populate('kittens');
  done();
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('cats', catSchema, 'cats', skipInit);
