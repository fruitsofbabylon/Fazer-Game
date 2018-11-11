import * as PIXI from 'pixi.js'
import colors from '../../colors';

const resources = PIXI.loader.resources
const SPRITE_WIDTH = 64
const SPRITE_HEIGHT = 64

export default class ColorActionElement extends PIXI.Container {

    constructor(colorId, actionId) {
        super()

        this.actionId = actionId
        this.colorId = colorId

        this.init()
    }

    init() {
        const actionSprite = new PIXI.Sprite(resources[this.actionId].texture)
        actionSprite.width = SPRITE_WIDTH
        actionSprite.height = SPRITE_HEIGHT

        const colorSprite = new PIXI.Sprite(PIXI.Texture.WHITE)
        colorSprite.width = SPRITE_WIDTH
        colorSprite.height = SPRITE_HEIGHT
        colorSprite.tint = colors[this.colorId].hex

        const arrowSprite = new PIXI.Sprite(resources["arrow"].texture)
        arrowSprite.width = SPRITE_WIDTH / 2
        arrowSprite.height = SPRITE_HEIGHT / 2

        colorSprite.position = { x: 0, y: 0 }
        arrowSprite.position = { x: SPRITE_WIDTH + 32, y: SPRITE_HEIGHT / 4 }
        actionSprite.position = { x: arrowSprite.x + SPRITE_WIDTH, y: 0 }

        this.addChild(actionSprite, colorSprite, arrowSprite)
    }
}