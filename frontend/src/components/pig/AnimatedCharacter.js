import React, { useState, useEffect } from 'react';
import './AnimatedCharacter.css';

import pigImage1 from '../img/SahaGod.jpg';
import pigImage2 from '../img/SahaGod2.jpg';
import screamerImage from '../img/SahaRot2.jpg'; 

function AnimatedCharacter() {
  const [currentImage, setCurrentImage] = useState(pigImage1);
  const [clickCount, setClickCount] = useState(0);
  const [isScreamerActive, setIsScreamerActive] = useState(false);

  const handlePigClick = () => {
    if (isScreamerActive) return; 

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 10) {
      setIsScreamerActive(true);
      setCurrentImage(screamerImage); 


      setTimeout(() => {
        setIsScreamerActive(false);
        setCurrentImage(pigImage1); 
        setClickCount(0); 
      }, 1000);

      return;
    }

    setCurrentImage(prev => prev === pigImage1 ? pigImage2 : pigImage1);
  };

  return (
    <div className="character-container">
      {!isScreamerActive ? (
        <img
          src={currentImage}
          alt="свин"
          className="moving-character"
          onClick={handlePigClick}
        />
      ) : (

        <div className="screamer-overlay">
          <img
            src={screamerImage}
            alt="СКРИМЕР!"
            className="screamer-image"
          />
        </div>
      )}
    </div>
  );
}

export default AnimatedCharacter;