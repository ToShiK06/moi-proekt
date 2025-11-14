import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Catalog.module.css';

const Catalog = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/booking'); // если вошёл → на страницу заявки
    } else {
      navigate('/login'); // если не вошёл → на страницу входа
    }
  };

  return (
    <div className={`${s.catalog} fade-in`}>
      <div className={`${s.textBox} fade-in-delay-1`}>
        <div className={`${s.name} fade-in-delay-1`}>КАТАЛОГ</div>
        <div className={`${s.text} fade-in-delay-2`}>КАКОЙ КУРС ВЫ ЖЕЛАЕТЕ ПРОЙТИ?</div>
        <div className={`${s.cards} fade-in-delay-3`}>
          <div className={`${s.cardTop1} fade-in-delay-4`}>
            <div className={`${s.card1} fade-in-delay-1`}>
              <div className={s.cardLogo1}></div>
              <div className={s.cardName}>Профессия Data Scientist</div>
              <div className={s.cardSell}>49 900 ₽</div>
              <div className={s.cardInfo}>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Практика на реальных датасетах</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Портфолио из 5 проектов</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Помощь в трудоустройстве</div>
                </div>
              </div>
              <button className={s.cardBut} onClick={handleBookingClick}>подать заявку</button>
            </div>
            <div className={`${s.card2} fade-in-delay-2`}>
              <div className={s.cardLogo2}></div>
              <div className={s.cardName}>Дизайн интерфейсов</div>
              <div className={s.cardSell}>34 900 ₽</div>
              <div className={s.cardInfo}>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Figma, Adobe XD, прототипирование</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Работа с клиентами и портфолио</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Сертификат от международной школы</div>
                </div>
              </div>
              <button className={s.cardBut} onClick={handleBookingClick}>подать заявку</button>
            </div>
            <div className={`${s.card3} fade-in-delay-3`}>
              <div className={s.cardLogo3}></div>
              <div className={s.cardName}>Финансовая грамотность</div>
              <div className={s.cardSell}>12 900 ₽</div>
              <div className={s.cardInfo}>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Бюджетирование, сбережения, инвестиции</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Работа с кредитами, страховками, НПФ</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Практические чек-листы и калькуляторы</div>
                </div>
              </div>
              <button className={s.cardBut} onClick={handleBookingClick}>подать заявку</button>
            </div>
          </div>
          <div className={`${s.cardTop2} fade-in-delay-5`}>
            <div className={`${s.card4} fade-in-delay-4`}>
              <div className={s.cardLogo4}></div>
              <div className={s.cardName}>Английский язык (B1–B2)</div>
              <div className={s.cardSell}>24 900 ₽</div>
              <div className={s.cardInfo}>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Разговорная практика с носителями</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Аудирование под реальные ситуации</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Готовься к IELTS/TOEFL (опционально)</div>
                </div>
              </div>
              <button className={s.cardBut} onClick={handleBookingClick}>подать заявку</button>
            </div>
            <div className={`${s.card5} fade-in-delay-5`}>
              <div className={s.cardLogo5}></div>
              <div className={s.cardName}>Маркетинг в Instagram</div>
              <div className={s.cardSell}>19 900 ₽</div>
              <div className={s.cardInfo}>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Контент-планы, сторис, Reels</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Анализ аудитории и виральность</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Кейсы реальных предпринимателей</div>
                </div>
              </div>
              <button className={s.cardBut} onClick={handleBookingClick}>подать заявку</button>
            </div>
            <div className={`${s.card6} fade-in-delay-6`}>
              <div className={s.cardLogo6}></div>
              <div className={s.cardName}>Психология отношений</div>
              <div className={s.cardSell}>17 900 ₽</div>
              <div className={s.cardInfo}>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Эмоциональный интеллект, коммуникация</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}>Работа с тревожностью и привязанностью</div>
                </div>
                <div className={s.info}>
                  <div className={s.arrow}></div>
                  <div className={s.infoText}> Упражнения и личные практики</div>
                </div>
              </div>
              <button className={s.cardBut} onClick={handleBookingClick}>подать заявку</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;