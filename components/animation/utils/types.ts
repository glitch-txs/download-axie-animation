import { MixedSkeletonData } from "@axieinfinity/mixer";

export interface Mixer {
  spine: MixedSkeletonData;
  variant: string;
}

export enum AxieDirection {
  Left = 1,
  Right = -1,
}

export type AxieAnimationType = {
  axieId: number,
  animationId?: number[],
  delay?: number,
  scaleAxie?: number,
  puffySize?: number,
  YPosition?: number,
  style?: {
    width?: number,
    height?: number,
    backgroundColor?: number,
    transparent?: boolean,
    resolution?: number,
  }
}

export type NewAnimationType = {
  animationId?: number[],
  loopAnimation?: boolean,
  delay?: number,
}

export type ConstructorOptions = {
  app: PIXI.Application,
  axieId: number, 
  animationId: number[],
  delay: number,
  scaleAxie:number, 
  setLoading: (Loading: boolean)=>void,
  setIntervalID: (ID: NodeJS.Timer) => void,

  style?: {
    width?: number,
    height?: number,
    backgroundColor?: number,
    transparent?: boolean,
    resolution?: number,
  }
}

export type ConstructorPlayground = {
  axieId: number, 
  animationId: number[],
  delay: number,
  scaleAxie:number, 
  setLoading: (Loading: boolean)=>void,
  YPosition: number,
  setIntervalID: (ID: NodeJS.Timer) => void,

  style?: {
    width?: number,
    height?: number,
    backgroundColor?: number,
    transparent?: boolean,
    resolution?: number,
  }
}
