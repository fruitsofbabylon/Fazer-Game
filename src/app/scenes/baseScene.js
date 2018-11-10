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
        bg.beginFill(this.sceneConfig.bgColor, 1.0)
        bg.drawRect(0, 0, this.sceneConfig.width, this.sceneConfig.height)
        bg.endFill()

        this.addChild(bg)
    }
}

export class SceneConfig {
    constructor(x, y, width, height, bg = 0xFFFFFF) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.bgColor = bg
    }
}