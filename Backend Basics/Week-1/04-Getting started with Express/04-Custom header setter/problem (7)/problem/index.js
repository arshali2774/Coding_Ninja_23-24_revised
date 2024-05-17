// Please don't change the pre-written code

const express = require('express');
const server = express();

// Set custom header on response object
const setCustomHeader = (res, contentType, format) => {
  // Write your code here
  res.set(contentType, format);
  console.log(`${contentType} with value ${format} has been set successfully`);
};

// Route that uses the setCustomHeader function
server.get('/', (req, res) => {
  setCustomHeader(res, 'Content-Type', 'application/json');
  res.send(`get method called!`);
});

module.exports = { setCustomHeader, server };
