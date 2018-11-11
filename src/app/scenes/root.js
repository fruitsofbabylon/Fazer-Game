import * as PIXI from 'pixi.js'
import OutputScene from './output';
import InputScene from './input/inputScene';
import CameraScene from './camera';
import { throws } from 'assert';
import { BaseScene, SceneConfig } from './baseScene';

export default class RootScene extends BaseScene {
  constructor(config) {
    super(config)

    this.init()
  }

  init() {
    const outputScene = new OutputScene( new SceneConfig(
      this.x, 
      this.y, 
      this.sceneConfig.width / 2, 
      this.sceneConfig.height,
      0x000000  
    ))

    this.addChild(
      new CameraScene(new SceneConfig(
        this.sceneConfig.width / 2, 
        this.y, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3
      ), event => outputScene.onColor(event.data.map(it => it.color))),
      outputScene,
      new InputScene(new SceneConfig(
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3 * 2,
        0xDEDEDE
      ))
    )
  }

  onTrackColor(event) {
    if (event.data.length == 0) return
    
  }
}
