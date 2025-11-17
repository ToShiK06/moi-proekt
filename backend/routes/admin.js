
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); 
const { DataTypes } = require('sequelize');

const router = express.Router();

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course_status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
    defaultValue: 'not_started',
  },
}, {
  tableName: 'users', 
  timestamps: true,
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны' });
  }

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
      process.env.JWT_SECRET || 'fallback_secret_key_for_dev',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      role: user.role,
      email: user.email,
      fullName: user.fullName || '',
    });

  } catch (error) {
    console.error('Ошибка при входе администратора:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
});


router.get('/users', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_dev');
    } catch (err) {
      return res.status(403).json({ message: 'Токен недействителен' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }

    const users = await User.findAll({
      attributes: ['id', 'email', 'fullName', 'role', 'course_status', 'createdAt'],
    });

    res.json(users);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ message: 'Ошибка сервера при загрузке пользователей' });
  }
});


router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { course_status } = req.body;

  if (!['not_started', 'in_progress', 'completed'].includes(course_status)) {
    return res.status(400).json({ message: 'Неверный статус курса' });
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_dev');
    } catch (err) {
      return res.status(403).json({ message: 'Токен недействителен' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }

    const [updatedRowsCount] = await User.update(
      { course_status },
      { where: { id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ message: 'Статус обновлён' });
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении статуса' });
  }
});


router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_dev');
    } catch (err) {
      return res.status(403).json({ message: 'Токен недействителен' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещён' });
    }

    const deletedRowsCount = await User.destroy({ where: { id } });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ message: 'Пользователь удалён' });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении' });
  }
});

module.exports = router;