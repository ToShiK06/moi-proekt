const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASS || 'mypassword',
  database: process.env.DB_NAME || 'authdb',
});

client.connect()
  .then(() => console.log('✅ Подключение к PostgreSQL успешно'))
  .catch(err => console.error('❌ Ошибка подключения:', err))
  .finally(() => client.end());