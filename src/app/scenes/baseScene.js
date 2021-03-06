import * as PIXI from 'pixi.js'

export class BaseScene extends PIXI.Container {
    constructor(config) {
        super()

        this.x = config.x
        this.y = config.y

        this.sceneConfig = config

        this._init()
    }

    _init() {
        const bg = new PIXI.Graphics()
        bg.beginFill(this.sceneConfig.bgColor, this.sceneConfig.bgColor == null ? 0 : 1)
        bg.drawRect(0, 0, this.sceneConfig.width, this.sceneConfig.height)
        bg.endFill()

        this.addChild(bg)
    }
}

export class SceneConfig {
    constructor(x, y, width, height, bg = null) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.bgColor = bg
    }
}