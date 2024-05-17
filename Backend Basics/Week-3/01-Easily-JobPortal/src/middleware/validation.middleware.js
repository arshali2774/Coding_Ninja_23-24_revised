import { body, validationResult } from 'express-validator';
import upload from './multer.middleware.js';

const validateRegisteration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateJob = [
  body('jobCategory').notEmpty().withMessage('Job category is required'),
  body('jobDesignation').notEmpty().withMessage('Job designation is required'),
  body('jobLocation').notEmpty().withMessage('Job location is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('salary').notEmpty().withMessage('Salary is required'),
  body('numberOfOpenings')
    .notEmpty()
    .withMessage('Number of openings is required'),
  body('skills').notEmpty().withMessage('Skills required is required'),
  body('applyBy').notEmpty().withMessage('Last date to apply is required'),
];
const validateApplicant = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  body('contact')
    .notEmpty()
    .withMessage('Contact is required')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
];
const validate = (req, res, next) => {
  const errors = validationResult(req);
  const userName = req.session.userName;
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render('home', { errors: errors.array()[0].msg, userName });
  }
  next();
};

export {
  validateRegisteration,
  validateLogin,
  validateJob,
  validateApplicant,
  validate,
};
