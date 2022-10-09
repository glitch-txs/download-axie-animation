import { useState, useContext, useEffect } from "react";
import { AxieAnimation } from "../components/AxieAnimationNoSsr";
import Controller from "../components/Controller/Controller";
import { AxieContext } from "../context/useContext";
import style from '../styles/pages/index.module.scss'
const Home = () => {
 
  const [axieId, setAxieId] = useState<number>(1367)
  const [axieStyle, setAxieStyle] = useState<object>()
  const [phone, setPhone] = useState<boolean>(false)
  const { animationIDs, direction, delay, background }: any = useContext(AxieContext)

  useEffect(() => {
    if(typeof window != 'undefined'){
      if(window.innerWidth<=600){
        setPhone(true)
      }else{
        setPhone(false)
      }
      if(background){
        setAxieStyle({
          width: window.innerWidth,
          height: window.innerHeight / 2,
          backgroundColor: 0xFFFFFF,
          resolution: window.devicePixelRatio,
        })
      } else {
        setAxieStyle({
          width: window.innerWidth,
          height: window.innerHeight / 2,
          backgroundColor: 0x14151b,
          resolution: window.devicePixelRatio,
        })
      }
    }
  }, [background])
  



  return (
    <>
    { phone ? (<div className={style.phone} >Currently not available <br/> for Phone :( </div>) :  
      (<div>
        <div style={{height:'50vh', width:'100%'}} >
          <AxieAnimation axieId={axieId} animationId={animationIDs} delay={delay} scaleAxie={direction} style={axieStyle} />
        </div>
          <Controller setAxieId={setAxieId}/>
      </div>)
      }
    </>
  );
};

export default Home;
