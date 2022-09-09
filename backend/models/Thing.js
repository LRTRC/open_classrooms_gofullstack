// import mongoose package
const mongoose = require('mongoose');

// Uses the 'Schema' method of mongoose to create a data schema model
const thingSchema = mongoose.Schema({
   title : {type: String, required: true},
   description : {type: String, required: true},
   imageUrl : {type: String, required: true},
   userId : {type: String, required: true},
   price : {type: Number, required: true},
});

// export it as the model named 'Thing' and that contains thingSchema as data
// schema model
module.exports = mongoose.model('Thing', thingSchema)