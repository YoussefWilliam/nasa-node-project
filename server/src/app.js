const express = require("express");

const app = express();

// Middleware functions
app.use(express.json());

module.exports = app;
