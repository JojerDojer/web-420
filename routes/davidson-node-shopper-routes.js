/**
============================================
; Title: davidson-node-shopper-routes.js
; Author: John Davidson
; Date: 09/24/2023
; Description: The Routing for WEB 420 - Assignment 7.2.
============================================
*/

const express = require('express');
const router = express.Router();
const Customer = require('../models/davidson-customer');

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for adding customers to MongoDB 
 *     summary: Creates a new customer document
 *     requestBody:
 *       description: Customer credentials
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Defines a route handler for creating new customers in the mongoDB customers collection.
router.post('/customers', async(req, res) => {
    try {
        // Create a new customer object.
        const newCustomer = new Customer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username
        });
        // Save the new customer object as a document in MongoDB
        await newCustomer.save();
        // If saved to DB, send a successful response with a json message.
        return res.status(200).json({ message: 'Customer added to MongoDB', newCustomer });
    } catch (e) {
        // If it is a mongoDB error, send a 501 response code with MongoDB error message.
        if (e.name === 'MongoError') {
            return res.status(501).json({ message: `MongoDB Exception ${e.message}` });
       } // If server error, send a 500 response code with a server error message.
       return res.status(500).json({ message: `Server Exception ${e.message}` });
    }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for adding new invoices to MongoDB
 *     summary: Creates a new invoice to a customer document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         schema:
 *         type: string  
 *     requestBody:
 *       description: Invoice data
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - invoices
 *             properties:
 *               username:
 *                 type: string
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                    price:
 *                      type: number
 *                    quantity:
 *                      type: number
 *     responses:
 *       '200':
 *         description: Invoice added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Defines a route handler for createInvoiceByUsername in the mongoDB customers collection.
router.post('/customers/:username/invoices', async(req, res) => {
    try {        
        // Query the Customers' collection, finding a customer by username.
        const customer = await Customer.findOne({ username: req.params.username });
        if (!customer) {
            return res.status(404).json({ message: "Username does not exist" });
          }
        // Create a new invoice object.
        const newInvoice = {
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            dateCreated: req.body.dateCreated,
            dateShipped: req.body.dateShipped,
            lineItems: req.body.lineItems
        };       
        // Push the new invoice object into the invoices array.
        customer.invoices.push(newInvoice);
        // Save the new invoice to MongoDB.
        await customer.save();
        // Send a successful response with a json message.
        return res.status(200).json({ message: 'Invoice added to MongoDB', newInvoice });
    } catch (e) {
        // If it is a mongoDB error, send a 501 response code with MongoDB error message.
        if (e.name === 'MongoError') {
            return res.status(501).json({ message: `MongoDB Exception ${e.message}` });
        }// If server error, send a 500 response code with a server error message.
        return res.status(500).json({ message: `Server Exception ${e.message}`});
    }
});

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for returning invoices by username
 *     summary: Returns invoices for the provided username
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer document username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Invoices array
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

// Define a route handler for findAllInvoicesByUsername in the MongoDB customers collection
router.get('/customers/:username/invoices', async(req, res) => {
    try {
        // Find customer in MongoDB collection based on the provided username parameter.
        const customer = await Customer.findOne({ username: req.params.username });
        // Send a successful response with a json message.
        return res.status(200).json({ message: 'Invoices Found', info: customer.invoices  });
    } catch (e) {
        // If it is a mongoDB error, send a 501 response code with MongoDB error message.
        if (error.name === 'MongoError') {
            return res.status(501).json({ message: `MongoDB Exception ${e.message} `});
        }// If server error, send a 500 response code with a server error message.
        return res.status(500).json({ message: `Server Exception ${e.message} `});
    }
});

// Exports the router module.
module.exports = router;