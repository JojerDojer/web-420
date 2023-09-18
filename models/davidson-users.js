/**
============================================
; Title: davidson-user.js
; Author: John Davidson
; Date: 09/17/2023
; Description: The Mongoose model for WEB 420 - Assignment 6.2.
============================================
*/

// Imports the mongoose module.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a user schema.
let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: { type: Array }
});

// Exports the mongoose model.
module.exports = mongoose.model('User', userSchema);