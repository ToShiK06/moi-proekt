const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Проверка подключения к БД
sequelize
  .authenticate()
  .then(() => console.log('✅ Подключение к MySQL успешно'))
  .catch(err => console.error('❌ Ошибка подключения:', err));

// Синхронизация моделей
sequelize.sync({ force: false })
  .then(() => console.log('✅ Таблицы синхронизированы'))
  .catch(err => console.error('❌ Ошибка синхронизации:', err));

// Роуты
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));

app.listen(5000, () => {
  console.log('🚀 Сервер запущен на http://localhost:5000');
});