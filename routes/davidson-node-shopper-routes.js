/**
============================================
; Title: davidson-node-shopper-routes.js
; Author: John Davidson
; Date: 09/22/2023
; Description: The Routing for WEB 420 - Assignment 7.2.
============================================
*/

const express = require('express');
const router = express.Router();
const Customer = require('../models/davidson-customer');

router.post('/customers', async(req, res) => {
    try {
        const newCustomer = new Customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        });
    }
})

