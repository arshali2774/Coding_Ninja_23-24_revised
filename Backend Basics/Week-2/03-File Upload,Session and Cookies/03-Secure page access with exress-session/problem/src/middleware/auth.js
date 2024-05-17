// Please don't change the pre-written code
// Import the necessary modules here

export const auth = (req, res, next) => {
  // Write your code here
  if (req.session && req.session.user) {
    // If the user is logged in, allow access to the next middleware or route handler
    next();
  } else {
    // If the user is not logged in, render the 'msgPage' view with an error message
    res.render('msgPage', { message: 'Login first to access secure page' });
  }
};
