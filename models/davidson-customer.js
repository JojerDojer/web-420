/**
============================================
; Title: davidson-customer.js
; Author: John Davidson
; Date: 09/22/2023
; Description: The Mongoose model for WEB 420 - Assignment 7.2.
============================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lineItemSchema =  new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

let invoiceSchema = new Schema({
    subtotal: { type: Number},
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema]
});

module.exports = mongoose.model('Customer', customerSchema)