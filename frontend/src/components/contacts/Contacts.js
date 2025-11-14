import React from 'react';
import s from './Contacts.module.css';

const Contacts = () => {
  return (
    <div className={`${s.main} fade-in`}>
      <div className={`${s.name} fade-in-delay-1`}>КОНТАКТЫ</div>
      <div className={s.box}>
        <div className={`${s.boxText} fade-in-delay-2`}>
          <div className={`${s.contAdres} fade-in-delay-3`}>
            <div className={s.logoAdres}></div>
            <div className={s.adres}>ул.откудаязнаюкакая, д.ну 10 мб</div>
          </div>
          <div className={`${s.contNomer} fade-in-delay-4`}>
            <div className={s.logoNomer}></div>
            <div className={s.nomer}>8 123-456-78-90</div>
          </div>
          <div className={`${s.contPochta} fade-in-delay-5`}>
            <div className={s.logoPochta}></div>
            <div className={s.pochta}>xxx@gg.com</div>
          </div>
        </div>
        <div className={`${s.map} fade-in-delay-6`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14005.980769818607!2d31.2654327229215!3d58.54500631901538!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46beeb053ae4a3d5%3A0xce876678024c9546!2z0JPQuNC80L3QsNC30LjRjyAi0JjRgdGC0L7QuiIg0LjQvC4g0JvQuNC7INCh0LzQvtC60Lg!5e0!3m2!1sru!2sru!4v1762408703619!5m2!1sru!2sru"
            width="100%"
            height="400"
            style={{
              border: "0",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contacts;