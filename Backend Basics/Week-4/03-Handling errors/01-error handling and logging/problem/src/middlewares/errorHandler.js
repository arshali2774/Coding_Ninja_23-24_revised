// Please don't change the pre-written code
// Import the necessary modules here

import { logger } from './logger.middleware.js';

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  if (err instanceof customErrorHandler) {
    const errorData = {
      level: 'error',
      timestamp: new Date().toString(),
      requestURL: req.originalUrl,
      errorMessage: err.message,
    };
    logger.error(JSON.stringify(errorData));
    res.status(err.statusCode).send(err.message);
  } else {
    const errorData = {
      level: 'error',
      timestamp: new Date().toString(),
      requestURL: req.originalUrl,
      errorMessage: err.toString(),
    };
    logger.error(JSON.stringify(errorData));
    res
      .status(500)
      .send('Oops! Something went wrong... Please try again later!');
  }
};
