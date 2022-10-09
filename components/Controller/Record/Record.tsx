import React, { useContext } from 'react'
import style from './Record.module.scss'
import { AxieContext } from '../../../context/useContext'

const Record = () => {

    const { setRecord, record }: any = useContext(AxieContext)

  return (
    <button className={style.btn} onClick={()=>setRecord(!record)} >{ record ? 'Stop Recording' : 'Start Recording' }</button>
  )
}

export default Record