import React, { useContext, useRef } from 'react'
import style from './SelectAnimation.module.scss'
import { animationListNames } from '../../animation/utils/animations'
import { AxieContext } from '../../../context/useContext'

const SelectAnimation = () => {
    
    const { setAnimationIDs }: any = useContext(AxieContext) 

    const checkRef = useRef<HTMLDivElement>()


    const handleChange = ()=>{

        let _animationList: number[] = [];

        animationListNames.map((item, index)=>{
            
            if((checkRef.current.children[index].firstChild as HTMLInputElement).checked){
                _animationList.push(index)
            }
            
        })

        setAnimationIDs(_animationList)
    }

  return (
    <div className={style.container} ref={checkRef} >
        { animationListNames.map((item, index)=>(
            <div key={index} className={style.boxContainer} >
            <input type='checkbox' name='animation' value={index} onChange={handleChange} id={item}  className={style.box} />
            <label className={style.label} htmlFor={item} ><span></span>{ item }</label>
            </div> 
        )) }
    </div>
  )
}

export default SelectAnimation