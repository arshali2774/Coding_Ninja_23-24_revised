// Please don't change the pre-written code
// Import the necessary modules here

export const generateRandomNumber = (req, res, next) => {
  // const randomNumber = Math.floor(Math.random() * 10) + 1;

  // // Write your code here to set the randomNumber as a cookie with a 1-day expiration.

  // res.cookie("attemptsLeft", 2, {
  //   maxAge: 1 * 24 * 60 * 60 * 1000,
  // });
  // next();
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  // Set randomNumber as a cookie with a 1-day expiration
  res.cookie('randomNumber', randomNumber, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  // Set attemptsLeft cookie (as per your provided code)
  res.cookie('attemptsLeft', 2, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  next();
};
