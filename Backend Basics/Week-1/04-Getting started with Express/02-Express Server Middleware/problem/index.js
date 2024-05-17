// Please don't change the pre-written code.

const express = require('express');
const app = express();

const logRequest = (req, res, next) => {
  // Write your code here
  // Log the request method and path to the console
  console.log(req.method);
  console.log(req.path);
  // Call next middleware in the chain
  next();
};

// This route should only be accessible after passing through the 'logRequest' middleware.
// Make necessary changes in the route below.
app.get('/', logRequest, (req, res) => {
  res.send('Coding Ninjas!');
});

module.exports = app;
