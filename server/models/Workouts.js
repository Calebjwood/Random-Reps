const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: [String],

  excercises: [excercises]
});

workoutsSchema.virtual('totalTimeInSeconds').get(function () {
  return this.exercises.reduce((acc, exercise) => acc + exercise.time, 0);
});

module.exports = mongoose.model('Workouts', workoutsSchema);