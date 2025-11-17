
const API_BASE_URL = 'http://localhost:5000'; 

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('admin_token')}`, 
});

/**
 * @returns {Promise<Array>} 
 */
export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, { 
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Ошибка получения пользователей: ${response.status}`);
  }

  return response.json();
};

/**
 * @param {number} userId 
 * @param {string} newStatus
 * @returns {Promise<Object>} 
 */
export const updateUserStatus = async (userId, newStatus) => {
  const response = await fetch(`${API_BASE_URL}/admin/user/${userId}`, { 
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ course_status: newStatus }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Ошибка обновления пользователя: ${response.status}`);
  }

  return response.json();
};

/**
 * @param {number} userId 
 * @returns {Promise<void>}
 */
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/admin/user/${userId}`, { 
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Ошибка удаления пользователя: ${response.status}`);
  }

  return response;
};