// src/services/adminApi.js

const API_BASE_URL = '/api'; // Замените на ваш реальный URL API, если он отличается

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

/**
 * Получить список пользователей
 * @returns {Promise<Array>} Массив пользователей
 */
export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения пользователей: ${response.status}`);
  }

  return response.json();
};

/**
 * Обновить статус пользователя
 * @param {number} userId - ID пользователя
 * @param {string} newStatus - Новый статус ('not_started', 'in_progress', 'completed')
 * @returns {Promise<Object>} Обновлённый пользователь
 */
export const updateUserStatus = async (userId, newStatus) => {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ course_status: newStatus }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка обновления пользователя: ${response.status}`);
  }

  return response.json();
};

/**
 * Удалить пользователя
 * @param {number} userId - ID пользователя
 * @returns {Promise<void>}
 */
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления пользователя: ${response.status}`);
  }

  // DELETE запросы обычно не возвращают тело
  return response;
};