/**
============================================
; Title: davidson-team-routes.js
; Author: John Davidson
; Date: 10/08/2023
; Description: The Routing for WEB 420 - Capstone Project.
============================================
*/

const express = require('express'); // Import the express module.
const router = express.Router(); // Import the router module.
const Team = require('../models/davidson-team'); // Import the Customer model.

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: API that retrieves all teams.
 *     summary: Retrieves all teams stored in the database.
 *     responses:
 *       '200':
 *         description: Array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

// Define a get route for finding all teams in the database.
router.get('/teams', async(req, res) => {
    try {  
        const findAllTeams = await Team.find();
        // Respond with ok 200 code and all teams in the database.
        res.status(200).json(findAllTeams);
    } catch (e) {
        // If a ServerError occurs, send a 500 response code and error message.
        if (e.name === 'ServerError') {
            return res.status(500).json({ message: `Server Exception: ${e.message}`})
        }
        // If a MongoDB exception occurs, send a 501 response code and error message.
        res.status(501).json({message: `MongoDB Exception: ${e.message}`});
    }
});

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for adding players to an existing team document.
 *     summary: Creates player document and adds it to a team with the specified teamId. 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team Id
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Player to add
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Define a post route for assigning players to a team document.
router.post('/teams/:id/players', async(req, res) => {
    try { 
        // Search for a team by teamId.
        const team = await Team.findById(req.params.id)
        // If the team is not found in the database, send a 401 response code with error message.
        if (!team) {
            res.status(401).json({ message: 'Invalid teamId' })
        }
        // Create a new player object
        const player = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salary: req.body.salary
        }
        // Push the new player object into the team players array.
        team.players.push(player);
        // Save the new player to MongoDB
        await team.save();
        // Respond with ok 200 code and the array of player documents.
        res.status(200).json(team)

    } catch (e) {
        // If a ServerError occurs, send a 500 response code and error message.
        if (e.name === 'ServerError') {
            return res.status(500).json({ message: `Server Exception: ${e.message}`})
        }
        // If a MongoDB exception occurs, send a 501 response code and error message.
        res.status(501).json({message: `MongoDB Exception: ${e.message}`});

   }
});

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *  get:
 *     tags:
 *       - Teams 
 *     description: API for retrieving all players be specified teamId
 *     summary: Retrieve all players by teamId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Define a get route for finding all players in a team by teamId.
router.get('/teams/:id/players', async(req, res) => {
    try {
        // Search for a team by teamId.
        const team = await Team.findById(req.params.id);
        // If the team is not found in the database, send a 401 response code with error message.
        if (!team) {
            res.status(401).json({ message: 'invalid teamId' });
        }        
        // Respond with a ok 200 code and the team document with players.
        res.status(200).json(team.players)

    } catch (e) {
        // If a ServerError occurs, send a 500 response code and error message.
        if (e.name === 'ServerError') {
            return res.status(500).json({ message: `Server Exception: ${e.message}`})
        }
        // If a MongoDB exception occurs, send a 501 response code and error message.
        res.status(501).json({message: `MongoDB Exception: ${e.message}`});
    }
});

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a team document by teamId
 *     summary: Removes a team by teamId
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of team to be deleted.
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team deleted
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Define a delete route that deletes a team by teamId.
router.delete('/teams/:id', async(req, res) => {
    try {
        // Search for a team by teamId and delete it.
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) {
            // If the team is not found in the database, send a 401 response code with error message.
            return res.status(401).json({ message: 'invalid teamId' });            
        }        
        // Respond with a ok 200 code and the team document that was deleted.
        res.status(200).json(team)
        
        
    } catch (e) {
        // If a ServerError occurs, send a 500 response code and error message.
        if (e.name === 'ServerError') {
            return res.status(500).json({ message: `Server Exception: ${e.message}`})
        }
        // If a MongoDB exception occurs, send a 501 response code and error message.
        res.status(501).json({message: `MongoDB Exception: ${e.message}`});
    }
});

// Export the router module.
module.exports = router