import * as PIXI from 'pixi.js'
import OutputScene from './output/outputScene';
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
    this.outputScene = new OutputScene( new SceneConfig(
      this.x, 
      this.y, 
      this.sceneConfig.width / 2, 
      this.sceneConfig.height,
      0x000000  
    ))
    this.inputScene = new InputScene(
      new SceneConfig(
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3 * 2,
        0xDEDEDE
      ), 
      actions => this.outputScene.onAction(actions),
      mode => this.outputScene.onModeUpdate(mode)
    )

    this.addChild(
      new CameraScene(new SceneConfig(
        this.sceneConfig.width / 2, 
        this.y, 
        this.sceneConfig.width / 2, 
        this.sceneConfig.height / 3
      ), event => this.onTrackColor(event)),
      this.outputScene,
      this.inputScene
    )
  }

  onTrackColor(event) {
    const colors = [...new Set(event.data.map(it => it.color))]
    this.inputScene.onColors(colors)
  }
}
