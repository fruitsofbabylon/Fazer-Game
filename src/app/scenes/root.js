import * as PIXI from 'pixi.js'
import OutputScene from './output';
import InputScene from './input';
import CameraScene from './camera';
import { throws } from 'assert';

export default class RootScene extends PIXI.Container {
  constructor(width, height) {
    super()
    this.position = new PIXI.Point(0, 0)

    this.sceneConfig = {
      width: width,
      height: height
    }

    this.init()
  }

  init() {
    const bg = new PIXI.Graphics()
    bg.beginFill(0xEBEBEB, 1.0)
    bg.drawRect(this.x, this.y, this.sceneConfig.width, this.sceneConfig.height)
    bg.endFill()
    
    this.addChild(
      bg,
      new OutputScene({
        x: this.x, 
        y: this.y, 
        width: this.sceneConfig.width / 2, 
        height: this.sceneConfig.height
      }),
      new InputScene({
        x: this.sceneConfig.width / 2, 
        y: this.sceneConfig.height / 3, 
        width: this.sceneConfig.width / 2, 
        height: this.sceneConfig.height / 3 * 2
      }),
      new CameraScene({
        x: this.sceneConfig.width / 2, 
        y: this.y, 
        width: this.sceneConfig.width / 2, 
        height: this.sceneConfig.height / 3
      })
    )
  }


}
