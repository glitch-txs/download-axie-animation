import * as PIXI from 'pixi.js'
import React, { useEffect, useRef, useState, FunctionComponent, useContext } from 'react'
import { PuffLoading } from './puff-loading/PuffLoading'
import { PlaygroundGame } from './Figures/PlaygroundGame'
import { AxieAnimationType } from './utils/types'
import s from './styles.module.css'
import fixWebmDuration from 'webm-duration-fix'
import { AxieContext } from '../../context/useContext'

export const def: AxieAnimationType = {
  axieId:NaN,
  animationId: [27,28,29,30],
  delay: 1.8,
  scaleAxie: 1,
  puffySize: 200,
  YPosition: 1.4,
 style: {
    width: window.innerWidth,
    height: window.innerHeight / 2,
    transparent: true,
    resolution: window.devicePixelRatio,
  },
}

PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH

export const AxieAnimation: FunctionComponent<AxieAnimationType> = ({ 
  axieId, 
  animationId = def.animationId, 
  delay = def.delay, 
  scaleAxie = def.scaleAxie, 
  YPosition = def.YPosition,
  style = def.style,
  puffySize = def.puffySize
}) => {

  const [loading, setLoading] = useState<boolean>()
  const [animation, setAnimation] = useState<string>('Animation')
  const [count, setCount] = useState<number>(0)

  const [browser, setBrowser] = useState<Boolean>(true)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const container = useRef<HTMLDivElement>(null)
  const gameRef = useRef<PlaygroundGame | null>(null)

  const [intervalID, setIntervalID] = useState<NodeJS.Timer>()

  const mediaRecorder = useRef<MediaRecorder>(null)

  const { record }: any = useContext(AxieContext)


  //Recording functions
    
  useEffect(() => {

    if(count === 0){
      return
    }else{

      function startRecording() {

        const canvas = container.current.firstChild as HTMLCanvasElement
        const chunks = []; // here we will store our recorded media chunks (Blobs)  
        const stream = canvas.captureStream(60); // grab our canvas MediaStream
        mediaRecorder.current = new MediaRecorder(stream, {
          mimeType:'video/webm',
          videoBitsPerSecond: 8000000
        }); // init the recorder
        // every time the recorder has new data, we will store it in our array
        mediaRecorder.current.ondataavailable = e => chunks.push(e.data);
        // only when the recorder stops, we construct a complete Blob from all the chunks
        mediaRecorder.current.onstop = async (e) => await exportVid(chunks);
        
        mediaRecorder.current.start();
        // setTimeout(()=>rec.stop(), timeInSecords * 1000); // stop recording in 3s
      }

      async function exportVid(chunks: BlobPart[]) {
    
        const blob = new Blob(chunks, {type: 'video/webm'})
        const fixedBlob = await fixWebmDuration(blob);
    
        const a = document.createElement('a');
        a.download = 'axieAnimation.webm';
        a.href = URL.createObjectURL(fixedBlob);
        a.click()
      }

      function stopRecording() {
        mediaRecorder.current.stop()
      }

      if(record){
        startRecording()
      } else {
        stopRecording()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record])
  
  

  useEffect(() => {
    
    window.addEventListener('blur', ()=>setBrowser(false)) 

    window.addEventListener('focus', ()=>setBrowser(true))

    return ()=>{
      window.removeEventListener('blur', ()=>setBrowser(false)) 

      window.removeEventListener('focus', ()=>setBrowser(true))
    }
  }, [])

  //rezise canvas on window resize
  useEffect(() => {

    const resize = ()=>{
      if(gameRef.current){
        gameRef.current.renderer.resize(window.innerWidth, window.innerHeight / 2)
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
    }

    window.addEventListener('resize', resize)

    return ()=> window.removeEventListener('resize', resize)

  }, [])
  
  
  
  //Initializes The Canvas and First Axie
  useEffect(() => {
    if(animationId && typeof delay !== 'undefined' && scaleAxie){
      if (!container) return
      if (!container.current) return
      const canvasContainer = container.current
      if (canvasContainer.childElementCount > 0) {
        canvasContainer.lastChild?.remove()
      }
      setLoading(true)
      const game = new PlaygroundGame({ axieId, animationId, delay, scaleAxie, setLoading, style, YPosition, setIntervalID })
      gameRef.current = game
      gameRef.current.startGame()
      canvasContainer.appendChild(game.view)
    }
    
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style])

  useEffect(() => {

    if(count === 0){
      setCount(1)
      return
    } else {
      setLoading(true)
      if(gameRef && gameRef.current && animationId && typeof delay !== 'undefined' && scaleAxie){
        gameRef.current.changeSpine({ axieId, animationId, delay, scaleAxie, setLoading, app: gameRef.current, setIntervalID })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axieId, scaleAxie])

  useEffect(() => {

    const onChangeAnimation = (animationId: number[], delay: number) => {
      setAnimation(animation)
        gameRef?.current?.currentFigure?.changeCurrentAnimation(animationId, delay, setIntervalID)
    }

    if(count === 0){
      return
    }else{
      if(animationId && typeof delay !== 'undefined'){
        clearInterval(intervalID)
        onChangeAnimation(animationId, delay)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationId, delay, browser])
  



  return (
    <>
      <div style={{ height:`${windowSize.height / 2}px`, width:`${windowSize.width}px`, position:'relative' }}>
        <div ref={container}  className={s.canvas}>
          {loading && (<PuffLoading size={puffySize}/>)}
        </div>
      </div>
    </>
  )
}
