import React, { useState } from 'react';
import './AnimatedCharacter.css';

import pigImage1 from '../img/SahaRot.jpg';
import pigImage2 from '../img/SahaRot2.jpg'; 

function AnimatedCharacter() {
  const [currentImage, setCurrentImage] = useState(pigImage1); 

  const handlePigClick = () => {
    setCurrentImage(prev => (prev === pigImage1 ? pigImage2 : pigImage1));
  };

  return (
    <div className="character-container">
      <img
        src={currentImage}
        alt="свин"
        className="moving-character"
        onClick={handlePigClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}

export default AnimatedCharacter;