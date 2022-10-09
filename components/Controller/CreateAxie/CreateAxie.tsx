import React, { useState, useContext, useRef } from 'react'
import { AxieContext } from '../../../context/useContext'
import Record from '../Record/Record'
import ToggleDirection from '../ToggleDirection/ToggleDirection'
import style from './CreateAxie.module.scss'

type Props = {
    setAxieId: (axieId: number) => void,
}

const CreateAxie = ({ setAxieId }: Props) => {

  const delayRef = useRef<HTMLInputElement>(null)

  const [valueId, setValueId] = useState<number>(1235)
  const [valueDelay, setValueDelay] = useState<number>(null)

  const { setDelay, delay }: any = useContext(AxieContext)

  const handleDelay = ()=>{
    setDelay(valueDelay)
    delayRef.current.value = null
  }

  return (
    <>
      <div className={style.container} >
        <ToggleDirection/>

        <div className={style.formContainer}>
          <input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={ e => setValueId(Number(e.target.value))} type="number" className={style.input} placeholder='set Axie ID' />
          <button className={style.btn} onClick={()=>setAxieId(valueId)} >Create Axie</button>
        </div>

        <div className={style.formContainer}>
          Current: { delay }s
          <input ref={delayRef}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={e => setValueDelay(Number(e.target.value))} type="number" className={style.input} placeholder='Delay in Sec' />
          <button className={style.btn} onClick={handleDelay} >Set Delay</button>
        </div>

        <Record/>
      </div>
    </>
  )
}

export default CreateAxie