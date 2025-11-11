import React from 'react'
import s from './Info.module.css'

const info = () => {
  return (
    <div className={s.info}>
      <div className={s.ramkaBox}>
        <div className={s.ramka}>
          <div className={s.glavn}>
            <div className={s.text}>
                <p>~1000000</p>
                <p style={{fontSize:'40px'}}>именно столько людей </p>
                <p style={{fontSize:'40px'}}>получило у нас образование</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default info
