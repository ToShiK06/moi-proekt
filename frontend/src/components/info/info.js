import React from 'react';
import s from './Info.module.css';

const info = () => {
  return (
    <div className={`${s.info} fade-in`}>
      <div className={s.ramkaBox}>
        <div className={s.ramka}>
          <div className={`${s.glavn} fade-in-delay-1`}>
            <div className={`${s.text} fade-in-delay-2`}>
              <p className="fade-in-delay-1">~1000000</p>
              <p style={{fontSize:'40px'}} className="fade-in-delay-2">именно столько людей</p>
              <p style={{fontSize:'40px'}} className="fade-in-delay-3">получило у нас образование</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default info;