// Please don't change the pre-written code
// Import the necessary modules here

import express from 'express';
import { createTweet, getTweets } from './tweet.controller.js';

const router = express.Router();

// Write your code here
router.get('/', getTweets);
router.post('/', createTweet);

export default router;
