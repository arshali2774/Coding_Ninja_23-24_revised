// Please don't change the pre-written code
// Import the necessary modules here
import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next) => {
  // Write your code here
  const authHeader = req.cookies.jwtToken;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      msg: { name: 'JsonWebTokenError', message: 'jwt must be provided' },
    });
  }
  try {
    const payload = jwt.verify(authHeader, 'M63BuTEqXKd4KdpPCAd2010Ic4tIaSrT');
    console.log(payload);
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

export default jwtAuth;
