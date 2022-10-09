import "pixi-spine"
import {
  AxieMixer,
  getAxieColorPartShift,
  getVariantAttachmentPath,
} from "@axieinfinity/mixer"

import { getGenes } from "../utils/getGenesOnChain"
import { Mixer } from "../utils/types"

export class Figure extends PIXI.spine.Spine {
  static readonly resourcePath = "https://axiecdn.axieinfinity.com/mixer-stuffs/v2/"
  mixer: Mixer

  constructor(mixer: Mixer) {
    const resources = Figure.getResources(mixer)
    const allTextures: { [key: string]: PIXI.Texture } = {}

    //Textures
    resources.map((resource) => {
      const texture = PIXI.Texture.from(resource.imagePath)
      allTextures[resource.key] = texture
    })

    //Spine Atlas
    const spineAtlas = new PIXI.spine.core.TextureAtlas()
    spineAtlas.addTextureHash(allTextures, false)

    const spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(
      spineAtlas
    )

    // Spine JSON
    const spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader)
    const spineData = spineJsonParser.readSkeletonData(mixer.spine)
    super(spineData)

    this.mixer = mixer
  }

  static async fromAxieId(loader: PIXI.loaders.Loader, id: number) {
    try {
      const genes = await getGenes(id)
      const mixer = new AxieMixer(genes).getAssets()
      if (!mixer) throw new Error("invalid mixer")
      const newFigure = await this.loadAndSpawn(loader, mixer)
      newFigure.stateData.setMix("draft/run-origin", "action/idle/normal", 0.1)
      newFigure.stateData.setMix("action/idle/normal", "draft/run-origin", 0.2)
      return newFigure
    } catch (e) {
      console.log(e)
      return
    }
  }

  static async loadAndSpawn(loader: PIXI.loaders.Loader, mixer: Mixer) {
    await this.loadResources(loader, mixer)
    return new Figure(mixer)
  }
  
  //adds all images urls to loader
  static async loadResources(loader: PIXI.loaders.Loader, mixer: Mixer) {
    loader.reset()
    const resources = this.getResources(mixer)
    resources.forEach((item) => {
      if (loader.resources[item.key] === undefined) {
        loader.add(item.key, item.imagePath)
      }
    })
    await new Promise((resolve) => loader.load(resolve))
  }

  //returns the whole URL path for each body part individually inside an array called imagesToLoad
  static getResources(mixer: Mixer) {
    const skinAttachments = mixer.spine.skins[0].attachments
    const imagesToLoad: { key: string; imagePath: string }[] = []

    const partColorShift = getAxieColorPartShift(mixer.variant)
    for (const slotName in skinAttachments) {
      const skinSlotAttachments = skinAttachments[slotName]
      for (const attachmentName in skinSlotAttachments) {
        const path = skinSlotAttachments[attachmentName].path

        let imagePath = this.resourcePath + getVariantAttachmentPath(slotName, path, mixer.variant, partColorShift)
        imagesToLoad.push({ key: path, imagePath })
      }
    }
    return imagesToLoad
  }

}
