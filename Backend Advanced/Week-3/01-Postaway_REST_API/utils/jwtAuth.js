import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, 'codinNinjas', (err, data) => {
    if (err) {
      res.status(401).send('unauthorized! login to continue!');
    } else {
      req._id = data._id;
      next();
    }
  });
};
