import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

import foto1 from './img/foto.jpg';
import foto2 from './img/asa.jpg';
import foto3 from './img/bb.jpg';
import foto4 from './img/qwq.jpg';


const ImageSlider = () => {
  const images = [
    foto1,
    foto2,
    foto3,
    foto4,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="slider-container">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Слайд ${index + 1}`} />
          </div>
        ))}
      </div>

      <button className="slider-button prev" onClick={prevSlide}>❮</button>
      <button className="slider-button next" onClick={nextSlide}>❯</button>

      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;