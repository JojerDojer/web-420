/**
============================================
; Title: davidson-customer.js
; Author: John Davidson
; Date: 09/24/2023
; Description: The Mongoose model for WEB 420 - Assignment 7.2.
============================================
*/

const mongoose = require('mongoose'); // Imports thr mongoose model.
const Schema = mongoose.Schema;

// Creates the line item schema.
let lineItemSchema =  new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

// Creates the invoices schema.
let invoiceSchema = new Schema({
    subtotal: { type: Number},
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

// Creates the customer schema.
let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    invoices: [invoiceSchema]
});

// Exports the mongoose model.
module.exports = mongoose.model('Customer', customerSchema)