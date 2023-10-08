/**
============================================
; Title: davidson-team.js
; Author: John Davidson
; Date: 10/08/2023
; Description: The Mongoose model for WEB 420 - Capstone Project.
============================================
*/

// Requires the mongoose module. 
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

// Creates a player schema.
let playerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    salary: { type: Number }
});

// Creates a team schema.
let teamSchema = new Schema({
    name: { type: String },
    mascot: { type: String },
    players: [playerSchema]
});

// Exports the mongoose model.
module.exports = mongoose.model('Team', teamSchema);

