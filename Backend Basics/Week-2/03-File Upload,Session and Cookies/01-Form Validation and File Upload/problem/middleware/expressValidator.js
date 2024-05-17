// Please don't change the pre-written code
// Import the necessary modules here
import { body, validationResult } from 'express-validator';
export const formValidation = async (req, res, next) => {
  // Write your code here
  console.log(req.body);
  const rules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('image').custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Profile image is required');
      }
      return true;
    }),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errorMessage: errors.array()[0].msg });
  }
  next();
};
