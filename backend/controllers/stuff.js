// import the 'Thing' data schema model from the models directory
const Thing = require("../models/Thing");

// Method to post a new tuple into database
// with mongoose
exports.createThing = (req, res, next) => {
    delete req.body._id;
    // set as 'thing' a new instance of Thing model with
    // the payload sent in the request body
    const thing = new Thing({
        ...req.body
    });
    // Uses the method save() of the mongoose model to send the instance
    // to the dataBase and as the resolve of the promise it sends
    // a response status 201 to the front and a message, or sends the error
    // with the catch() method
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
}

// Method to update an existing tuple into things table in database
exports.updateThing = (req, res, next) => {
    // the first argument is used to find the existing tuple
    // the second argument is  used to send the updated object
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        // resolve the promise with a status code 200 and a message
        .then(() => res.status(200).json({message: 'Objet modifié !'}))
        // send the error as object if there is an error
        .catch(error => res.status(400).json({error}));
}

// Method to delete a tuple in things table in database
exports.deleteThing = (req, res, next) => {
    // delete the tuple with the id given as parameter in the first argument
    Thing.deleteOne({_id: req.params.id})
        // resolve the promise with a status code 200 and a message
        .then(() => res.status(200).json({message: 'Objet supprimé !'}))
        // send the error as object if there is an error
        .catch(error => res.status(400).json({error}));
}

// Method to get all tuples from things table in the database
exports.getAllThings = (req, res, next) => {
    // find() is a method of the model, it can have some filters in parameters
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error}))
}

// Method to get one specific tuple from things table in the database
exports.getOneThing = (req, res, next) => {
    // findOne method will return the tuple with the same
    // id passed in parameters of the request
    Thing.findOne({_id: req.params.id})
        // then it resolves the promise with the tuple as a json object
        .then(thing => res.status(200).json(thing))
        // if an error is catch, it sends the error as json object and 404 code
        .catch(error => res.status(404).json({error}))
}