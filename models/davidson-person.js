/**
============================================
; Title: davidson-person.js
; Author: John Davidson
; Date: 09/10/2023
; Description: The Mongoose model for WEB 420 - Assignment 5.2.
============================================
*/

// Imports mongoose module.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a role schema.
let roleSchema = new Schema({
    text: { type: String }
});

// Creates a dependent schema.
let dependentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String}
});

// Creates a person schema.
let personSchema = new Schema({
    firstName: {type: String },
    lastName: {type: String },
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: { type: String}
});

// Exports the mongoose model.
module.exports = mongoose.model('Person', personSchema)