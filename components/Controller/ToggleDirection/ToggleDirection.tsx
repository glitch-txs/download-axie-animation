import React, { useContext } from 'react'
import { AxieContext } from '../../../context/useContext'
import style from './ToggleDirection.module.scss'

const ToggleDirection = () => {

    const { setDirection, direction, setBackground, background }: any = useContext(AxieContext)

const handleToggle = ()=>{
    setDirection(- direction)
}

  return (
    <div className={style.container}>
        <div className={style.direction}>
            <div className={style.title} >
                Axie Direction
            </div>

            <label className={style.toggleControl}>
                <input type="checkbox" onChange={handleToggle} />
                <span className={style.control}></span>
            </label>
        </div>

        <div className={style.background}>
            <div className={style.title} >
                Background Color
            </div>

            <label className={style.toggleControl}>
                <input type="checkbox" onChange={()=>setBackground(!background)} />
                <span className={style.control}></span>
            </label>
        </div>


    </div>
  )
}

export default ToggleDirection