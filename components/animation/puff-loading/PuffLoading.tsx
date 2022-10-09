import React from 'react'
import img from '../assets/puff-loading.png'
import s from './styles.module.css'

interface PuffLoadingProps {
  size?: number
}

export const PuffLoading = (props: PuffLoadingProps) => {
  const { size } = props
  return (
    <div className={s.loadingWrapper}>
      <img
        src={img.src}
        style={{ maxWidth: size }}
        className={s.spin}
        alt="loading"
      />
    </div>
  )
}