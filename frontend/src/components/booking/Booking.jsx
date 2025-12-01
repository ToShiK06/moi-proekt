import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '../register/PhoneInput'; 
import './Booking.css';

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course: '',
    name: '',
    email: '',
    phone: '',
    date: '', 
    comment: '',
  });
  const [errors, setErrors] = useState({});

  
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  const validate = () => {
    const newErrors = {};

   
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ФИО';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    
    if (!formData.phone) {
      newErrors.phone = 'Введите номер телефона';
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        newErrors.phone = 'Номер телефона слишком короткий';
      } else if (digitsOnly.length > 15) {
        newErrors.phone = 'Номер телефона слишком длинный';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Выберите дату';
    }

    if (!formData.course) {
      newErrors.course = 'Выберите курс';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };


  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });

 
    if (errors.phone) {
      setErrors({
        ...errors,
        phone: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log('Данные заявки:', formData);

    alert('Заявка успешно отправлена!');
    navigate('/');
  };

  return (
    <div className="booking-container fade-in">
      <div className="booking-form fade-in-delay-1">
        <h2>Подача заявки</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group fade-in-delay-2">
            <label htmlFor="course">Выберите курс:</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={errors.course ? 'error' : ''}
            >
              <option value="">-- Выберите курс --</option>
              <option value="data-scientist">Профессия Data Scientist</option>
              <option value="ui-design">Дизайн интерфейсов</option>
              <option value="finance">Финансовая грамотность</option>
              <option value="english">Английский язык (B1–B2)</option>
              <option value="marketing">Маркетинг в Instagram</option>
              <option value="psychology">Психология отношений</option>
            </select>
            {errors.course && <p className="error-message">{errors.course}</p>}
          </div>

          <div className="form-group fade-in-delay-3">
            <label htmlFor="name">ФИО:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group fade-in-delay-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

         
          <div className="form-group fade-in-delay-5">
                    <label htmlFor="phone">Телефон</label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={handlePhoneChange} 
                      required
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                  </div>

          <div className="form-group fade-in-delay-5">
            <label htmlFor="date">Дата:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
              required
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>

          <div className="form-group fade-in-delay-6">
            <label htmlFor="comment">Комментарий:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="booking-button fade-in-delay-7">
            Отправить заявку
          </button>
        </form>

        <button onClick={() => navigate('/')} className="back-button fade-in-delay-8">
          На главную
        </button>
      </div>
    </div>
  );
};

export default Booking;