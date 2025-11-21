import transporter from '../config/mailer';

const sendVerificationEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Please verify your email address',
    text: `Click the link to verify your email: ${process.env.FRONTEND_URL}/verifymail/${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendPassowrdResetEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Please use below link to reset your password',
    text: `Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Employer Email Functions
const sendEmployerVerificationEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your employer account email address',
    text: `Click the link to verify your employer account email: ${process.env.FRONTEND_URL}/employer/verifymail/${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending employer verification email:', error);
  }
};

const sendEmployerPasswordResetEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset your employer account password',
    text: `Click the link to reset your employer account password: ${process.env.FRONTEND_URL}/employer/reset-password/${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending employer password reset email:', error);
  }
};

export { sendVerificationEmail, sendPassowrdResetEmail, sendEmployerVerificationEmail, sendEmployerPasswordResetEmail };
