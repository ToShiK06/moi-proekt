import React from 'react';
import s from "./Main.module.css";
import AnimatedCharacter from '../pig/AnimatedCharacter'
import ImageSlider from '../ImageSlider';

const Maih = () => {
  return (
    <div className={`${s.main} fade-in`}>
      <AnimatedCharacter/>
      <div className={`${s.box} fade-in-delay-1`}>
        <div className={`${s.containerForText} fade-in-delay-2`}>
          <p className="fade-in-delay-1">Халоу мабой!</p>
          <p className="fade-in-delay-2">Лучшие образования</p>
          <p className="fade-in-delay-3">на Korochki.Net</p>
          <a href='#catal' style={{width:'350px'}} className={`fade-in-delay-4 ${s.zapis}`}>записаться</a>
        </div>
        <div className={`${s.c} fade-in-delay-5`}>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default Maih;