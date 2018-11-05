import * as PIXI from 'pixi.js'

export default class InputScene extends PIXI.Container {
  constructor(config) {
    super()
    this.x = config.x
    this.y = config.y

    this.sceneConfig = {
      width: config.width,
      height: config.height
    }

    this.init()
  }

  init() {
    const bg = new PIXI.Graphics()
    bg.beginFill(0xFF69B4, 1.0)
    bg.drawRect(0, 0, this.sceneConfig.width, this.sceneConfig.height)
    bg.endFill()
    this.addChild(bg)
  }
}
