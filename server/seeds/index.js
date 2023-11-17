require('dotenv').config();

const connection = require('../config/connection');
const { User, Workouts } = require('../models');
const data = require("./data.json");
const workout = require("./exercises.json")


async function seed() {
    await connection.dropCollection('users');
    await User.create(data.user);
    // await Workouts.create(workout.workout);
    process.exit(0);
}

seed();