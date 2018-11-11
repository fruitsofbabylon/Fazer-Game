import * as PIXI from 'pixi.js'

const resources = PIXI.loader.resources

export default class SequenceActionElement extends PIXI.Container {
    constructor(actionId, width, height) {
        super()
        this.actionId = actionId
        this.init(width, height)
    }

    init(width, height){
        const actionSprite = new PIXI.Sprite(resources[this.actionId].texture)
        actionSprite.width = width
        actionSprite.height = height
        this.addChild(actionSprite)
    }
}