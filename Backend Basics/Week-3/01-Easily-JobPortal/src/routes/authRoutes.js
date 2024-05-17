import express from 'express';
import {
  validate,
  validateLogin,
  validateRegisteration,
} from '../middleware/validation.middleware.js';
import UserModel from '../model/user.model.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page', errors: null, userName: null });
});
router.get('/postjob', (req, res) => {
  const userName = req.session?.userName;
  if (userName) {
    return res.render('postJob', { userName });
  }
  return res.render('home', {
    userName,
    errors: 'User not found. Register First.',
  });
});
router.get('/login', (req, res) => {
  res.render('login', { userName: null, errors: null });
});
router.post('/register', validateRegisteration, validate, (req, res) => {
  const { name, email, password } = req.body;
  UserModel.add(name, email, password);
  res.render('login', { errors: null, userName: null });
});
router.post('/login', validateLogin, validate, (req, res) => {
  const { email, password } = req.body;
  const user = UserModel.isValidUser(email, password);
  if (!user) {
    return res.render('login', {
      errors: 'No user found. Please Register',
      userName: null,
    });
  }
  req.session.userEmail = email;
  req.session.userName = user.name;
  res.redirect('/jobs');
});
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
  res.clearCookie();
});

export default router;
