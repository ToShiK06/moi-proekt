require('dotenv').config();

const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); 

const app = express();



app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use(express.json());


sequelize
  .authenticate()
  .then(() => console.log('✅ Подключение к MySQL успешно'))
  .catch(err => console.error('❌ Ошибка подключения:', err));
  

sequelize.sync({ force: false })
  .then(() => console.log('✅ Таблицы синхронизированы'))
  .catch(err => console.error('❌ Ошибка синхронизации:', err));


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes); 

app.listen(5000, () => {
  console.log('🚀 Сервер запущен на http://localhost:5000');
});