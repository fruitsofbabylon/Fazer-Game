import * as PIXI from 'pixi.js'
import { BaseScene, SceneConfig } from '../baseScene';
import ColorInputScene from './colorInputScene';
import SequenceInputScene from './sequenceInputScene';
import TabHeader from './tabHeader';
import { levels, currentLevel, modes } from '../../levels';

export default class InputScene extends BaseScene {
  constructor(config, onActions, onModeUpdate) {
    super(config)

    this.currentTabIndex = 0
    this.onActions = onActions
    this.onModeUpdate = onModeUpdate
    this.possibleActions = levels[currentLevel].actions
    this.previousColors = []

    this.init()
  }

  init() {
    this.createTabHeader()
  }

  onColors(colors) {
    if (this.currentTabIndex != 0 && colors.length == 0) return

    if (colors.every(it => this.previousColors.includes(it))) {
      return // The same as colors before
    }
    this.previousColors = colors

    const actions = colors.map(color => this.possibleActions.find(it => it.color == color))
      .map(it => it.icon)
      
    this.onActions(actions)
  }

  createTabHeader() {
    this.tabParams = [
      { 
        header: modes[0], 
        isActive: true
      },
      {
        header: modes[1],
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
        scene: new SequenceInputScene(contentConfig, actions => this.onActions(actions))
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

    this.onModeUpdate(modes[index])
  }
}
