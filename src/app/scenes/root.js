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
    this.addChild(
      new CameraScene(new SceneConfig(
        this.sceneConfig.width / 2, 
        this.y, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3
      )),
      new OutputScene( new SceneConfig(
        this.x, 
        this.y, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height,
        0x000000  
      )),
      new InputScene(new SceneConfig(
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3 * 2,
        0xDEDEDE
      ))
    )
  }


}
