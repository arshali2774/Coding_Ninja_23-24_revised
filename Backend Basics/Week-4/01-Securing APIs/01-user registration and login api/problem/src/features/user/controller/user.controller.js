// Please don't change the pre-written code
// Import the necessary modules here

import { addUser, confirmLogin } from '../model/user.model.js';

export const registerUser = (req, res, next) => {
  // Write your code here
  const newUser = addUser(req.body);
  res.status(201).json({ status: 'success', user: newUser });
};

export const loginUser = (req, res) => {
  // Write your code here
  try {
    const isUser = confirmLogin(req.body);
    res.status(200).json({ status: 'success', msg: 'login successfull' });
  } catch (error) {
    res.status(401).json({ status: 'failure', msg: error.message });
  }
};
