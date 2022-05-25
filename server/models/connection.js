const mongoose = require('mongoose');
const { eventNames } = require('./schemas/user');
require('dotenv').config();

mongoose.connect(process.env.DB_CONN);

mongoose.connection.on('connected', () => {
    console.log('connected to DB');
})

mongoose.connection.on('error', (err) => {
    console.log(`err ${err}`);
})

mongoose.connection.on('disconected', () => {
    console.log('DB disconected');
})