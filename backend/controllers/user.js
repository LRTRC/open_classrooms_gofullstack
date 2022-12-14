// import the bcrypt package
const bcrypt = require('bcrypt')

// import the jsonwebtoken package
const jwt = require('jsonwebtoken')

// import he User model
const User = require('../models/User')

// Method to create a new user
exports.signup = (req, res, next) => {
    // calls the function hash that hash the user's password
    // the second argument, 10, is the count that the algorithm hashes the password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Create a new User with the data model
            // the response from the function hash is used as the user's password value
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // create the user in the database with mongoose's method 'save'
            // the model being 'user', the table created will be named users
            user.save()
                // if the promise is solved, it will respond a code 201 and a message
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                // else it sends an 400 code with the error as object
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};

// method to find a user with the email givent by the client
// as filter
exports.login = (req, res, next) => {
    // uses mongoose method
    User.findOne({email: req.body.email})
        // if the promise is solved
        .then(user => {
            // if the current user isn't found
            if(user === null) {
                res.status(401).json({message: 'identifiant ou mot de passe incorrecte'})
            } else {
                // if the user is found, uses bcrypt methode to compare
                // the hash found in the database and the hash given by the client
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        // if the result is false
                        if (!valid) {
                            // then sends an error message to client with code 401
                            res.status(401).json({message: 'identifiant ou mot de passe incorrecte'})
                        } else {
                            // if the result is true and the password correct
                            // sends a code 200 and the user's id and token
                            // to identify its http requests
                            res.status(200).json({
                                userId: user._id,
                                // calls jwt method sign
                                // first arg : payload that we want to encode
                                // second : key for encoding (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production).
                                // third : options
                                token : jwt.sign(
                                    {userId: user._id},
                                    'RANDOM_TOKEN_SECRET',
                                    {expiresIn: '24h'}
                                )
                            })
                        }
                    })
                    // if there is an error of communication between backend and database
                    .catch(error => res.status(500).json({error}))
            }
        })
        .catch(error => res.status(500).json({error}))
};