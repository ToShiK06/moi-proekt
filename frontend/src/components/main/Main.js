import React from 'react'
import s from "./Main.module.css"

const Maih = () => {
  return (
    <div className={s.main}>
      <div className={s.box}>
       <div className={s.containerForText}>
        <p>Халоу мабой!</p>
         <p>Лучшие образования</p>
          <p>на Korochki.Net</p>
           <a href='#catal' style={{width:'350px'}} className={s.zapis}>записаться</a>
         </div>
        <div className={s.containerForPic}></div>
      </div>

    </div>
  )
}

export default Maih
