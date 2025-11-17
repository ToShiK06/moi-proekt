
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
 
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

  
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён. Требуется роль администратора.' });
    }

   
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

   
    res.json({
      token,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    });

  } catch (error) {
    console.error('Ошибка при входе администратора:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;