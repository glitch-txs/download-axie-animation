import React from 'react'
import CreateAxie from './CreateAxie/CreateAxie'
import SelectAnimation from './SelectAnimation/SelectAnimation'
import style from './Controller.module.scss'

type Props = {
  setAxieId: (axieId: number)=> void,
}

const Controller = ({ setAxieId }: Props) => {
  return (
    <div className={style.container} >

      <hr className={style.hr} />
      <SelectAnimation/>

      <hr className={style.hr} />
      <CreateAxie setAxieId={setAxieId} />
    </div>
  )
}

export default Controller