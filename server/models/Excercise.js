const mongoose = require('mongoose');

const { Schema } = mongoose;

const excercisesSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: [String],

  sets: {
    type: Number
  },
  reps: {
    type: Number
  },
  rest: {
    type: Number
  },
  link: {
    type: String,
    trim: true
  },
  time: {
    type: Number,
    default:0
  }
});

module.exports = mongoose.model('Excercise', excercisesSchema);