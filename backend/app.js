// import express
const express = require('express');
// Import the router /routes/stuff.js
const stuffRoutes = require('./routes/stuff')
// Import users router
const userRoutes = require('./routes/user')
// import mongoose package from node modules
const mongoose = require('mongoose');

// connect the API to our MongoDB database
mongoose.connect('mongodb+srv://lrtrc:pK4kf9txwAx46hj@api-salle-de-sport.gxatfvw.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// calls the method express to create an app express
const app = express();


// set a middleware for all routes and requests, as there is no path in the first argument
app.use((req, res, next) => {
    // allow to access to the API from all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    // set headers properties allowed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // set headers methods allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// This middleware sets on all request that have a json content
// and gave access to the body of the request
app.use(express.json());

// For all routes that contains /api/stuff, app will use the router
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes)

// export app to access it from node server
module.exports = app;