import React from 'react';

const PhoneInput = ({ value = '', onChange }) => {
  const handleChange = (event) => {
    const input = event.target.value.replace(/\D/g, '');
    let formattedPhone = '';

    if (input.length > 0) {
      formattedPhone += '+7 ';
    }
    if (input.length > 1) {
      formattedPhone += `(${input.slice(1, 4)}) `;
    }
    if (input.length > 4) {
      formattedPhone += `${input.slice(4, 7)}-`;
    }
    if (input.length > 7) {
      formattedPhone += `${input.slice(7, 9)}-`;
    }
    if (input.length > 9) {
      formattedPhone += `${input.slice(9, 11)}`;
    }

    
    onChange(formattedPhone);
  };

  const handleFocus = (event) => {
    event.target.value = value.replace(/\D/g, '');
  };

  const handleBlur = (event) => {
    handleChange(event);
  };

  return (
    <input
      type="tel"
      value={value} 
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="+7 (___) ___-__-__"
      className="phone-input"
    />
  );
};

export default PhoneInput;