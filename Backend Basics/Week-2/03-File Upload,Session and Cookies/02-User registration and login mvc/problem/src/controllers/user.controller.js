// Please don't change the pre-written code
// Import the necessary modules here

import { authenticateUser, registerUser } from '../models/user.model.js';

export default class UserController {
  getRegister = (req, res, next) => {
    // Write your code here
    res.render('user-register');
  };
  getLogin = (req, res, next) => {
    // Write your code here
    res.render('user-login');
  };
  addUser = (req, res) => {
    // Write your code here
    const userDetails = req.body;
    registerUser(userDetails);
    res.render('user-login');
  };
  loginUser = (req, res) => {
    // Write your code here
    const userDetails = req.body;
    const result = authenticateUser(userDetails);
    if (result.success) {
      res.json({ success: true, message: 'login successful' });
    } else {
      res.json({ success: false, message: 'login failed' });
    }
  };
}
