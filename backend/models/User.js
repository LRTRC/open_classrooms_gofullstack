// import mongoose package
const mongoose = require('mongoose');

// import unique Validator package to avoid error from mongoose
// on unique values
const uniqueValidator = require('mongoose-unique-validator');
// Uses the 'Schema' method of mongoose to create a data schema model
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// let userSchema uses uniqueValidator
userSchema.plugin(uniqueValidator)

// export the User model as 'User'
module.exports = mongoose.model('User', userSchema);