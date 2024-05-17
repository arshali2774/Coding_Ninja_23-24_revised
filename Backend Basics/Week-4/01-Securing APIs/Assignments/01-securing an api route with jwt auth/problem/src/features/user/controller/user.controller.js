// Please don't change the pre-written code
// Import the necessary modules here

import { addUser, confirmLogin } from '../model/user.model.js';
import jwt from 'jsonwebtoken';
export const registerUser = (req, res, next) => {
  const userData = req.body;
  if (userData) {
    let user = addUser(userData);
    res.status(201).send({ status: 'success', user });
  } else {
    res.status(400).json({ status: 'failure', msg: 'invalid user details' });
  }
};

export const loginUser = (req, res) => {
  let status = confirmLogin(req.body);
  if (status) {
    //  Write your code here to create the JWT token and store it in a cookie named "jwtToken"
    const token = jwt.sign(
      { email: req.body.email },
      'M63BuTEqXKd4KdpPCAd2010Ic4tIaSrT',
      { expiresIn: '1h' }
    );
    res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true });
    res
      .status(200)
      .json({ status: 'success', msg: 'login successfull', token });
  } else {
    res.status(400).json({ status: 'failure', msg: 'invalid user details' });
  }
};
