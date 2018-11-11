import * as PIXI from 'pixi.js'
import { BaseScene, SceneConfig } from '../baseScene';
import ColorInputScene from './colorInputScene';
import SequenceInputScene from './sequenceInputScene';
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
        isActive: true
      },
      {
        header: '2',
        isActive: false
      }
    ]

    this.tabHeader = new TabHeader(this.tabParams, clickedIndex => this.setTabActive(clickedIndex))
    this.addChild(this.tabHeader)

    const contentConfig = new SceneConfig(
      0,
      this.tabHeader.height,
      this.sceneConfig.width,
      this.sceneConfig.height - this.tabHeader.height
    )
    this.sceneParams = [
      {
        scene: new ColorInputScene(contentConfig)
      },
      {
        scene: new SequenceInputScene(contentConfig)
      }
    ]
    this.setTabActive(this.currentTabIndex)
  }

  setTabActive(index) {
    if (this.currentTabIndex != null) {
      const previousScene = this.sceneParams[this.currentTabIndex].scene
      this.removeChild(previousScene)
    }

    this.currentTabIndex = index
    const newScene = this.sceneParams[this.currentTabIndex].scene
    this.addChild(newScene)
  }
}
