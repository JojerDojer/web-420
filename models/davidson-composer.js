/**
============================================
; Title: davidson-composer.js
; Author: John Davidson
; Date: 09/3/2023
; Description: The Mongoose model for WEB 420 - Assignment 4.2.
============================================
*/

// Imports mongoose module.
const mongoose = require('mongoose'); // Imports mongoose module.
const Schema = mongoose.Schema;  

// Define a new mongoose schema. 
let composerSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String }
});

// Exports the mongoose model.
module.exports = mongoose.model('Composer', composerSchema);