// require('dotenv').config();

const connection = require('../config/connection');
const { User} = require('../models');
const data = require("./data.json");
const workout = require("./exercises.json")

 


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    userCheck = connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    workoutCheck = connection.db.listCollections({name: 'workouts'}).toArray();
    if (workoutCheck.length) {
        await connection.dropCollection('workouts');
    }

    await User.create(data.user)
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
