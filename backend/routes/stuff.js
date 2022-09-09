// import express
const express = require('express');

//import auth middleware
const auth = require('../middleware/auth');

// import express router
const router = express.Router();

// import our 'things' controller from /controllers/stuff.js
const stuffCtrl = require('../controllers/stuff')

// set a middleware to get dynamically a tuple in the 'things' table
// NodeJs use a colon: in front of the dynamic segment of the route
// to make it accessible as a parameter
router.get('/:id', auth, stuffCtrl.getOneThing);

//set a middleware to get all the tuples from table things, with mongoose methode
// Thing.find()
router.get('/', auth, stuffCtrl.getAllThings);

// set a middleware to post Thing instances to the database
router.post('/', auth, stuffCtrl.createThing);

// set a middle to update an existing tuple in the database
router.put('/:id', auth, stuffCtrl.updateThing);

// set a middle to delete an existing tuple in the database
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;