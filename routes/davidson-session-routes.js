/**
============================================
; Title: davidson-session-routes.js
; Author: John Davidson
; Date: 09/17/2023
; Description: The Routing for WEB 420 - Assignment 6.2.
============================================
*/

const express = require('express'); // Imports the Express module.
const router = express.Router(); // Creates a router object using Express.
const User = require('../models/davidson-users'); // Imports the User Model.
const bcrypt = require('bcryptjs'); // Imports bcryptjs for hashing and verifying passwords.


let saltRounds = 10; // Set the number of salt rounds for password hashing.

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     summary: Register user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *     responses:
 *       '200':
 *         description: User added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Define a route handler for a signing up.
router.post('/signup', async(req, res) => {
    try {
        // Query the users collection, making sure the new username is not already in use.
        const currentUser = await User.findOne({ userName: req.body.userName });
        if (currentUser) {
            // If username is taken, send a 401 response code with a message.
            return res.status(401).json({ message: 'Username is already in use'});
        }
        // Hash the user's password synchronously using bcrypt and store the result in a variable.
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        // Creates a new instance of the 'user' model to represent the user being registered.
        const newRegisteredUser = new User({
            userName: req.body.userName,
            password: hashedPassword,
            emailAddress: req.body.emailAddress
        });
        // Use await to save the new Person object to the database.
        await newRegisteredUser.save();
        // Send a successful response as JSON.
        return res.status(200).json({ message: 'Registered user'});
    } catch (error) {
        if (error.name === 'MongoError') {
            // If it is a MongoDB error, send a 501 response code with MongoDB error message.
            return res.status(501).json({ message: `MongoDB Exception ${error.message}` });
          // If not a MongoDB error, send a 500 response code with a server error message.  
        } return res.status(500).json({ message: `Server Exception ${error.message}`});
    }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login user
 *     summary: Logs the user in
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/login', async(req, res) => {
    try {
        // Query the users collection, looking for a matching username.
        const findUser = await User.findOne({ userName: req.body.userName });
        // If username is found in collection, proceed to check the password. 
        if (findUser) {
            // Compare password in the request body with the hashed password stored in the 'user' object.            
            let passIsValid = bcrypt.compareSync(req.body.password, findUser.password);
            if (passIsValid) {
                // If password password matches, return 200 status code with a message.
                return res.status(200).json({ message: 'User logged in'});
            } else {
                // If password is invalid, return a 401 status code with a message.
                return res.status(401).json({ message: 'Invalid username and/or password' });
            }            
        } else {
            // If password is not found in collection, return a 401 status code with a message.
            return res.status(401).json({message: 'Invalid username and/or password' });
        }
    } catch (error) {
        if (error.name === 'MongoError') {
            // If it is a MongoDB error, send a 501 response code with MongoDB error message.
            res.status(501).json({ message: `MongoDB Exception ${error.message}`});
        }
        // If not a MongoDB error, send a 500 response code with a server error message.
        return res.status(500).json({ message: `Server Exception ${error.message}`});
    }
});

// Exports the router module.
module.exports = router;

