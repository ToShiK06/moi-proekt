
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

/**
 * @returns {Promise<Array>} 
 */
export const fetchReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки отзывов: ${response.status}`);
  }

  return response.json();
};

/**
 * @param {Object} reviewData 
 * @param {string} reviewData.user_name 
 * @param {number} reviewData.rating
 * @param {string} reviewData.comment 
 * @returns {Promise<Object>} 
 */
export const createReview = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Ошибка отправки отзыва: ${response.status}`);
  }

  return response.json();
};