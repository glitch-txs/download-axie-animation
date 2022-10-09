import { animationList } from "../utils/animations";
import { Figure } from "./LoadFigure";
import { AxieDirection, ConstructorOptions } from "../utils/types";

export class CurrentFigure extends PIXI.Container {
  currentSpine?: Figure;
  currentAnimation: string;
  direction: AxieDirection;

  constructor() {
    super();
    this.direction = AxieDirection.Left;
    this.currentAnimation = "action/idle/normal";
  }

  async changeSpine(loader: PIXI.loaders.Loader, options: ConstructorOptions) {
    if(this.currentSpine){
      this.removeChild(this.currentSpine);
    }
    const prevSpine = this.currentSpine;

    const newFigure = await Figure.fromAxieId(loader, options.axieId);
    if (!newFigure) throw new Error("Invalid Axie ID");
    this.currentSpine = newFigure;

      this.setScaleAxie(options.scaleAxie)
      this.changeCurrentAnimation(options.animationId, options.delay, options.setIntervalID);
    this.addChild(this.currentSpine);
    options.setLoading(false)
    if(prevSpine){
      this.removeChild(prevSpine);
    }
  }

  changeCurrentAnimation(animationId: number[], delay: number, setIntervalID: (ID: NodeJS.Timer)=> void ) {

    //this counter helps to reduce the amount of calls to the loop funtion
    let counter = 0;
    let firstTime = true;
  
    setInterval(() => counter++ ,1000) 


    if (this.currentSpine?.state.hasAnimation('action/run')) {
      this.currentSpine.state.setAnimation(0, 'action/run', true);
    }
    if (this.currentSpine?.spineData.animations.find((item) => item.name.includes("action/mix/eyes-animation"))?.duration !== 0) {
      this.currentSpine?.state.addAnimation(1, "action/mix/eyes-animation", true, 0)
    }
    if (this.currentSpine?.spineData.animations.find((item) => item.name.includes("action/mix/ear-animation"))?.duration !== 0) {
      this.currentSpine?.state.addAnimation(2, "action/mix/ear-animation", true, 0)
    }
    if (this.currentSpine?.spineData.animations.find((item) => item.name.includes("action/mix/body-animation"))?.duration !== 0) {
      this.currentSpine?.state.addAnimation(3, "action/mix/body-animation", true, 0)
    }
    if (this.currentSpine?.spineData.animations.find((item) => item.name.includes("action/mix/normal-mouth-animation"))?.duration !== 0) {
      this.currentSpine?.state.addAnimation(4, "action/mix/normal-mouth-animation", true, 0)
    }

    this.currentSpine?.state.addAnimation(0, "action/idle/normal", true, 0);

    const animationDuration = this.currentSpine?.state.tracks[0].animation.duration || 1;

    if(delay === 0 && animationId.length == 1){
      this.currentSpine?.state.setAnimation(0, animationList[animationId[0]], true);
    } else{
      const _intervalID =  setInterval(()=>{

        if( (counter >= animationId.length * delay * animationDuration) || firstTime){
          animationId.forEach((id)=>{
              this.currentSpine?.state.addAnimation(0, animationList[id], false, delay);
              this.currentSpine?.state.addAnimation(0, "action/idle/normal", true, 0);
          })
          counter = 0;
          firstTime = false;
      }
      }, 1000)

      setIntervalID(_intervalID)
    }

  }

    //Scaling Axie Size
    setScaleAxie(scaleAxie: number){
      //If scaleAxie is negative, it will rotate the axie 180deg on the x direction, plus scaling the size of the Axie as usual.
      if(scaleAxie < 0 && this.currentSpine?.scale.x){
          this.currentSpine.scale.x = 0.25 * scaleAxie;
          this.currentSpine.scale.y = 0.25 * Math.abs(scaleAxie);
      } else {
          this.currentSpine?.scale.set(0.25 * scaleAxie);
      }
    }
}
