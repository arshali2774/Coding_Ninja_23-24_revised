// Please don't change the pre-written code
// Import the necessary modules here
import nodemailer from 'nodemailer';
import readline from 'readline';

const Solution = () => {
  // Write your code here
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codingninjas2k16@gmail.com',
      pass: 'slwvvlczduktvhdj',
    },
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter recipient's email address: ", (email) => {
    const mailOptions = {
      from: 'codingninjas2k16@gmail.com',
      to: email,
      subject: 'Coding Ninjas',
      text: 'The world has enough coders; be a coding ninja!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
      rl.close();
    });
  });
};

export default Solution;
