import * as PIXI from 'pixi.js'
import { BaseScene } from './baseScene';
import { levels, currentLevel } from '../levels';

const resources = PIXI.loader.resources

export default class OutputScene extends BaseScene {
  constructor(config) {
    super(config)

    this.init()
  }

  init() {
    this.possibleActions = levels[currentLevel].actions
  }

  onColor(colors) {
    this.removeChildren()

    const icons = [...new Set(colors)] // Only unique colors
      .map(color => this.possibleActions.find(it => it.color == color))
      .map(it => it.icon)
      .forEach(icon => {
        const actionSprite = new PIXI.Sprite(resources[icon].texture)
        actionSprite.width = 64
        actionSprite.height = 64
        this.addChild(actionSprite)
      })
  }
}
