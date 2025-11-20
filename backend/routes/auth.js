const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { sendConfirmationEmail } = require('../utils/sendEmail'); 
const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  const { email, password, phone, fullName } = req.body; 

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      phone,
      fullName, 
      email_confirmed: 0, 
    });

    const confirmationToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const confirmUrl = `http://localhost:3000/confirm-email?token=${confirmationToken}`;

    
    try {
      await sendConfirmationEmail(email, confirmUrl);
    } catch (err) {
      console.error('Ошибка отправки письма:', err);
      
      await user.destroy();
      return res.status(500).json({ error: 'Ошибка отправки письма подтверждения' });
    }

    res.status(201).json({
      message: 'Регистрация успешна. Пожалуйста, проверьте почту для подтверждения.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Вход
router.post('/login', async (req, res) => {
  console.log('Получены данные:', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }


    if (user.email_confirmed !== 1) {
      return res.status(400).json({ error: 'Почта не подтверждена. Проверьте вашу почту.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    console.log('Возвращаем данные:', {
     token,
     role: user.role,
     email: user.email,
     phone: user.phone,
     fullName: user.fullName, 
     });
    res.json({
      token,
      role: user.role,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Роут для получения данных пользователя 
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Нет токена' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'email', 'phone', 'fullName', 'role', 'email_confirmed'],
    });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

   
    if (user.email_confirmed !== 1) {
      return res.status(400).json({ error: 'Почта не подтверждена.' });
    }

    res.json({
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      email_confirmed: user.email_confirmed,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/confirm-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id, email: decoded.email } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.email_confirmed === 1) {
      return res.status(400).json({ message: 'Почта уже подтверждена' });
    }

    await user.update({ email_confirmed: 1 });

    res.json({
      message: 'Почта успешно подтверждена! Теперь вы можете войти в систему.',
      user: { id: user.id, email: user.email },
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Срок действия ссылки истёк. Зарегистрируйтесь снова.' });
    }
    console.error('Ошибка подтверждения:', error);
    res.status(500).json({ message: 'Ошибка подтверждения' });
  }
});

module.exports = router;