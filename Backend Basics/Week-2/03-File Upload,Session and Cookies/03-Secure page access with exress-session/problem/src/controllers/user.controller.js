import { authenticateUser, registerUser } from '../models/user.model.js';

export default class UserController {
  getRegister = (req, res, next) => {
    res.render('user-register');
  };
  getLogin = (req, res, next) => {
    res.render('user-login');
  };
  addUser = (req, res) => {
    const status = registerUser(req.body);
    if (status) return res.render('user-login');
  };
  loginUser = (req, res) => {
    // const isAuth = authenticateUser(req.body);
    // if (isAuth) {
    //   req.session.userEmail = req.body.email;
    //   res.render('msgPage', { message: 'login successfull' });
    // } else res.render('msgPage', { message: 'login failed' });
    const userDetails = req.body;
    const result = authenticateUser(userDetails);
    console.log(result, userDetails);
    if (result) {
      // If login is successful, set the user session and redirect to the secure page
      req.session.user = userDetails;
      res.redirect('/');
    } else {
      // If login fails, render the login page with an error message
      res.render('user-login', { error: 'Invalid email or password' });
    }
  };
  getSecure = (req, res) => {
    if (req.session && req.session.user) {
      res.render('secure-page');
    } else {
      // If the user is not logged in, redirect to the login page
      res.redirect('/login');
    }
    // res.render("secure-page");
  };
  userLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) res.status(401).send(err);
      else res.redirect('/login');
    });
  };
}
