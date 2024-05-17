// Please don't change the pre-written code
// Import the necessary modules here
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'error-logging' },
  transports: [new winston.transports.File({ filename: 'error.log' })],
});
