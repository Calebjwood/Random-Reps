const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutsSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  type: [String],

  excercises: [excercises]
});


module.exports = mongoose.model('Workouts', workoutsSchema);