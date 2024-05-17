import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.STORFLEET_MAIL,
    to: user.email,
    subject: 'Welcome to Storefleet!',
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
                    <h1>Welcome to Storefleet!</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>Welcome to Storefleet! We're excited to have you as a new member of our community.</p>
                    <p>If you have any questions or need assistance, feel free to contact us.</p>
                </div>
            </div>
        </body>
        </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
