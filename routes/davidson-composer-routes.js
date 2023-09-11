/**
============================================
; Title: davidson-composer-routes.js
; Author: John Davidson
; Date: 09/3/2023
; Description: The Routing for WEB 420 - Assignment 4.2.
============================================
*/

const express = require('express'); // Imports the Express module.
const router = express.Router(); // Create a router object using Express.
const Composer = require('../models/davidson-composer'); // Imports the Composer model.

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 * get:
 *   tags:
 *     - Composers
 *   description: API for returning an array of composer objects.
 *   summary: returns an array of composers in JSON format.
 *   responses: 
 *     '200':
 *       description: array of composers.
 *     '500':
 *       description: Server Exception.
 *     '501':
 *       description: MongoDB Exception.  
 */       

// Define a route handler for GET requests. 
router.get('/composers', async(req, res) => {    
    try {
        // Find all composers in the database.        
        const composers = await Composer.find();
        // Send a successful response and the found persons as JSON.            
        res.status(200).json(composers)        
    // If error occurs on the server's behalf, respond with server error message.
    } catch (e) {        
        res.status(500).json({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 * get:
 *   tags:
 *     - Composers
 *   description: API for returning a composer document.
 *   summary: returns a composer document.
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: Composer document id
 *       schema:
 *         type: string      
 *   responses: 
 *     '200':
 *       description: Composer document.
 *     '500':
 *       description: Server Exception.
 *     '501':
 *       description: MongoDB Exception.  
 */   

// Define a route handler for GET requests for a composer by their id.
router.get('/composers/:id', async(req, res) => {
    // Stores the id parameter from the URL in the 'id' variable.
    const id = req.params.id;
    try {
        // Find composer by their id in the database.
        const findComposerById = await Composer.findById(id);
        // Send a successful response and found composer as JSON.
        res.status(200).json(findComposerById);
    } catch (e) {
        // If error occurs, send server error response.
        res.status(500).json({
            'message': `Server Exception: ${e.message}`
        });
    }
});     
    

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composer
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

// Define a route handler for POST request.
router.post('/composers', async(req, res) => {
    // Creates a new composer object based on data received in the request body.
    const newComposer = new Composer({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    try {
        // Save a new Composer object to the database.        
        await newComposer.save();
        // Send a successful response and the created composer as JSON.
        res.status(201).json(newComposer)
    } catch (e) {
        // If error occurs, send a server response.
        res.status(500).json({
            'message': `Server Exception: ${e.message}`
        });
    }
});            
 
// Exports the router module.
module.exports = router;