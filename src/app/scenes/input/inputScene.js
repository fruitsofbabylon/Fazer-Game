import * as PIXI from 'pixi.js'
import { BaseScene, SceneConfig } from '../baseScene';
import ColorInputScene from './colorInput';
import SequenceInputScene from './sequenceInput';
import TabHeader from './tabHeader';

export default class InputScene extends BaseScene {
  constructor(config) {
    super(config)

    this.currentTabIndex = 0

    this.init()
  }

  init() {
    this.createTabHeader()
  }

  createTabHeader() {
    this.tabParams = [
      { 
        header: '1', 
        scene: new ColorInputScene(
          new SceneConfig(
            0,
            0,
            this.sceneConfig.width,
            this.sceneConfig.height
          )
        ),
        isActive: true
      },
      {
        header: '2',
        scene: new SequenceInputScene(
          new SceneConfig(
            0,
            0,
            this.sceneConfig.width,
            this.sceneConfig.height
          )
        ),
        isActive: false
      }
    ]

    this.tabHeader = new TabHeader(this.tabParams, clickedIndex => this.setTabActive(clickedIndex))
    this.addChild(this.tabHeader)

    this.setTabActive(this.currentTabIndex)
  }

  setTabActive(index) {
    if (this.currentTabIndex != null) {
      const previousScene = this.tabParams[this.currentTabIndex].scene
      this.removeChild(previousScene)
    }

    this.currentTabIndex = index
    const newScene = this.tabParams[this.currentTabIndex].scene
    this.addChild(newScene)
  }
}
