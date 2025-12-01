
const express = require('express');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const router = express.Router();

const Review = sequelize.define('Review', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.TINYINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'reviews',
  timestamps: true,
  createdAt: 'created_at',  
  updatedAt: false, 
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({ order: [['created_at', 'DESC']] });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка загрузки отзывов' });
  }
});

router.post('/', async (req, res) => {
  const { user_name, rating, comment } = req.body;

  if (!user_name || !rating || !comment) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Рейтинг должен быть от 1 до 5' });
  }

  try {
    const review = await Review.create({ user_name, rating, comment });
    res.status(201).json(review);
  } catch (error) {
   console.error('КРИТИЧЕСКАЯ ОШИБКА:', error);
  res.status(500).json({ 
    message: 'Ошибка создания отзыва',
    details: error.message 
  });
  }
  
});

module.exports = router;