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
router.get('/composers', async(req, res) => {    
    try {
        // Retrieve an array of all composers.
        Composer.find({}, function(err, composers) {
            // If error occurs Mongo's behalf, respond with mongo error message.
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            // If successful, respond with array of composers.
            } else {
                console.log(composers);
                res.json(composers);
            }
        })
    // If error occurs on the server's behalf, respond with server error message.
    } catch (e) {
        console.log(e);
        res.status(500).send({
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

router.get('/composers/:id', async(req, res) => {     
    try {
        // Retrieve a composer by id parameter.
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            // If error occurs Mongo's behalf, respond with mongo error message.
            if (err) {                
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            // If successful, respond with composer document.
            } else {
                console.log(composer);
                res.json(fruit);
            }
        })
    // If error occurs on the server's behalf, respond with server error message.
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

/**
 * createComposer
 * @openapi
 * /api/composer:
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

router.post('/composers', async(req, res) => {
    try {
        // Creates a new composer object with data from the request body.
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        await Composer.create(newComposer, function(err, composer) {
            // If error occurs Mongo's behalf, respond with mongo error message.
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            // If successful, respond with newly created composer document.
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    // If error occurs on the server's behalf, respond with server error message.
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })        
    }
})

// Exports the router module.
module.exports = router;