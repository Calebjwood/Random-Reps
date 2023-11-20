const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {workoutSchema} = require('./Workouts')
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  savedWorkouts: [workoutSchema],

  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]

});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('totalTimeInSeconds').get(function () {
  return this.exercises.reduce((acc, exercise) => acc + exercise.time, 0);
});

userSchema.virtual('followersCount').get(function () {
  return this.followers.length;
});

userSchema.virtual('followingCount').get(function () {
  return this.following.length;
});

module.exports = mongoose.model('User', userSchema);