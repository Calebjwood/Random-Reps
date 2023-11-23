const mongoose = require('mongoose');
const excerciseSchema = require('./Excercise');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  title: {
    type: String,
  },
  types: [String],
  exercises: [excerciseSchema],
});

workoutSchema.virtual('estimatedTime').get(function () {
  return this.exercises.reduce((acc, Exercise) => acc + Exercise.time, 0);
});

Workout = mongoose.model('Workout', workoutSchema);
module.exports = {Workout, workoutSchema}