import React, { useState } from 'react';
import './AnimatedCharacter.css';

import pigImage from '../img/saha.jpeg'; 

function AnimatedCharacter() {
  const [isExploded, setIsExploded] = useState(false);

  const handlePigClick = () => {
    setIsExploded(true);
    
  
    setTimeout(() => {
      setIsExploded(false);
    }, 1500);
  };

  return (
    <div className="character-container">
      {!isExploded ? (
     
        <img 
          src={pigImage} 
          alt="свин" 
          className="moving-character"
          onClick={handlePigClick}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        
        <div className="explosion-animation">
          <div className="explosion-circle"></div>
          <div className="explosion-spark"></div>
          <div className="explosion-text">💥 БУМ! 💥</div>
        </div>
      )}
    </div>
  );
}

export default AnimatedCharacter;