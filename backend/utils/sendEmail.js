
const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (email, confirmUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Подтверждение почты на Korochki.Net',
    html: `
      <h2>Добро пожаловать!</h2>
      <p>Пожалуйста, подтвердите ваш email, перейдя по ссылке:</p>
      <a href="${confirmUrl}" style="padding: 10px 20px; background-color: #0A0A09; color: white; text-decoration: none; border-radius: 5px;">Подтвердить почту</a>
      <p>Ссылка действительна 1 час.</p>
      <p>Если вы не регистрировались — проигнорируйте это письмо.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено на', email);
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    throw new Error('Не удалось отправить письмо');
  }
};

module.exports = { sendConfirmationEmail };