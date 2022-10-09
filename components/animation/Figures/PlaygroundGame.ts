import * as PIXI from "pixi.js";

import { CurrentFigure } from "./CurrentFigure";
import { Figure } from "./LoadFigure";
import { ConstructorOptions, ConstructorPlayground } from "../utils/types";

export class PlaygroundGame extends PIXI.Application {
  offsetWidth: number | undefined;
  offsetHeight: number | undefined;
  currentFigure: CurrentFigure | undefined;
  axieId: number;
  animationId: number[];
  delay: number;
  scaleAxie:number;
  setLoading: (Loading: boolean)=>void;
  YPosition: number;
  setIntervalID: (ID: NodeJS.Timer) => void;

  constructor(options: ConstructorPlayground) {
    super(options.style);
    this.offsetWidth = options?.style?.width;
    this.offsetHeight = options?.style?.height;
    this.axieId = options.axieId;
    this.animationId = options.animationId;
    this.delay = options.delay;
    this.scaleAxie = options.scaleAxie;
    this.setLoading = options.setLoading;
    this.YPosition = options.YPosition;
    this.setIntervalID = options.setIntervalID

    this.currentFigure = undefined;
  }

  startGame() {
    PIXI.utils.clearTextureCache()

    this.loader.load(async () => {
      const currentFigure = new CurrentFigure();
      const figure = await Figure.fromAxieId(this.loader, this.axieId);
      if(figure){
        currentFigure.currentSpine = figure;
        currentFigure.addChild(figure);
      }
        currentFigure.changeCurrentAnimation(this.animationId, this.delay, this.setIntervalID);
        currentFigure.setScaleAxie(this.scaleAxie)
      
      if(this.offsetWidth && this.offsetHeight){
        currentFigure.position.set(this.offsetWidth / 2, this.offsetHeight / this.YPosition);
      }
      this.stage?.addChild(currentFigure);
      this.currentFigure = currentFigure;
      this.setLoading(false)
    });

    this.start();
  }

  changeSpine(options: ConstructorOptions) {
    PIXI.utils.clearTextureCache()
    return this.currentFigure?.changeSpine(this.loader, options);
  }

}
