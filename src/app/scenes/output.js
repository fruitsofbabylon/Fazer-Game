import * as PIXI from 'pixi.js'
import { BaseScene } from './baseScene';

const resources = PIXI.loader.resources

export default class OutputScene extends BaseScene {
  constructor(config) {
    super(config)

    this.init()
  }

  init() {
    this.bg = this.getChildAt(0)
  }

  onAction(actions) {
    if (actions.length == 0) return

    clearTimeout(this.timeout)

    this.removeChildren()
    this.addChild(this.bg)

    this.sprites = actions.map(action => {
      const actionSprite = new PIXI.Sprite(resources[action].texture)
      actionSprite.width = 64
      actionSprite.height = 64
      actionSprite.name = "currentSprite"
      return [actionSprite, 1000]
    })

    this.scheduleNext(0)    
  }

  scheduleNext(millis) {
    this.timeout = setTimeout(() => {
      const [sprite, duration] = this.sprites.shift()
      this.removeChild(this.getChildByName("currentSprite"))
      this.addChild(sprite)

      if (this.sprites.length > 0) {
        this.scheduleNext(duration)
      }
    }, millis)
  }
}
