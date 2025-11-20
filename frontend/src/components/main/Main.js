import React from 'react';
import s from "./Main.module.css";
import AnimatedCharacter from '../pig/AnimatedCharacter'

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
        <div className={`${s.containerForPic} fade-in-delay-5`}></div>
      </div>
    </div>
  );
};

export default Maih;