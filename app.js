/**
============================================
; Title: app.js
; Author: John Davidson
; Date: 08/19/2023
; Description: The JavaScript file for WEB 420 - Assignment 1.2.
============================================
*/

// Enables strict mode
"use strict";

// Import necessary modules: Express, HTTP, Swagger UI, Swagger JSDoc, and Mongoose.
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');



const composerAPI = require('./routes/davidson-composer-routes'); // Imports the composerAPI routes.
const Composer = require('./models/davidson-composer'); // Imports the Composer model.
const personAPI = require('./routes/davidson-person-routes'); // Imports the personAPI.
const userAPI = require('./routes/davidson-session-routes'); // Imports the userAPI.
const customerAPI = require('./routes/davidson-node-shopper-routes'); // Imports the customerAPI.
const teamAPI = require('./routes/davidson-team-routes') // Imports the teamAPI.

// Stores the connection string to mongoDB
const CONN = 'mongodb+srv://web420_user:s3cret@bellevueuniversity.feyswh3.mongodb.net/web420DB';

// Sets up the connection to MongoDB.
mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

// Creates an express application instance.
const app = express();

// Defines the port number
const PORT = process.env.PORT || 3000;


app.use(express.json()); // Parse incoming JSON data.
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data. 
app.use('/', teamAPI)

// Configuration options for Swagger documentation configuration.
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

// Generates swagger specification. 
const openapiSpecification = swaggerJsdoc(options);

// Serve Swagger documentation using Swagger UI middleware.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Route API requests to the specified router.
app.use('/api', composerAPI); 
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);
app.use('/api', teamAPI)


// Starts the express server and listens on port 3000. 
app.listen(PORT, () => {
    console.log('Application started and listening on port ' + PORT)
});


