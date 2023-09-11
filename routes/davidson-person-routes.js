/**
============================================
; Title: davidson-person-routes.js
; Author: John Davidson
; Date: 09/10/2023
; Description: The Routing for WEB 420 - Assignment 5.2.
============================================
*/

const express = require('express'); // Imports the Express module.
const router =  express.Router(); // Creates a router object using Express.
const Person = require('../models/davidson-person'); // Imports the Person model.

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: API for returning an list of person documents from MongoDB.
 *     summary: return list of person documents.
 *     responses:
 *       '200':
 *         description: Array of persons.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

// Define a route handler for GET requests 
router.get('/persons', async(req, res) => {
    try {
        // Use await to find all persons in the database.
        const findAllPersons = await Person.find();
        // Send a successful response and the found persons as JSON.
        res.status(200).json(findAllPersons);        
    } catch (error) {
        // If error occurs, send server error response.
        res.status(500).json({
            'message': `Server Exception ${error.message}` 
        });        
    }
})

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     name: createPerson
 *     description: API for adding a new person document to MongoDB Atlas
 *     summary: Creates a new person document
 *     requestBody:
 *       description: person information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Person added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Define a route handeler for POST requests.
router.post('/persons', async(req, res) => {
    // Create a new Person object based on data received in the request body.
    const createPerson = new Person({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roles: req.body.roles,
        dependents: req.body.dependents,
        birthDate: req.body.birthDate
    });
    try {
        // Use await to save the new Person object to the database.
        await createPerson.save();
        // Send a successful response and the created person as JSON.
        res.status(200).json(createPerson);
    } catch (error) {
        // If error occurs, send a server error response.
        res.status(500).json({
            'message': `Server Exception ${error.message}`
        });
    }
});

// Exports the router module.
module.exports = router