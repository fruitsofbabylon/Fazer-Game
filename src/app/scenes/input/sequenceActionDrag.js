import * as PIXI from 'pixi.js'
import SequenceActionElement from './sequenceAction';

const ACTION_WIDTH = 64
const ACTION_HEIGHT = 64
const PADDING = 20

export default class SequenceActionDragContainer extends PIXI.Container {
    constructor(actionIds, rowSize, dragStartListener) {
        super()
        this.actionIds = actionIds
        this.rowSize = rowSize
        this.dragStartListener = dragStartListener
        this.init()
    }
    init() {
        let previousX = 0
        let previousY = 0
        this.actionIds.forEach((actionId, index) => {
            const actionElement = new SequenceActionElement(actionId, ACTION_WIDTH, ACTION_HEIGHT)
            actionElement.position = new PIXI.Point(previousX, previousY)
            actionElement.interactive = true
            actionElement.buttonMode = true
            this.addChild(actionElement)

            actionElement.on('mousedown', event => this.onStartDrag(event))

            if ((index + 1) % this.rowSize == 0) {
                previousX = 0
                previousY += ACTION_HEIGHT + PADDING
            } else {
                previousX += ACTION_WIDTH + PADDING
            }
        })
    }
    onStartDrag(event) {
        const element = event.currentTarget
        this.removeChild(element)

        this.dragStartListener(event)
    }
    onStopDrag(element) {
        const index = this.actionIds.indexOf(element.actionId)
        const row = Math.floor(index / this.rowSize)
        const column = index % this.rowSize

        element.position.x = (ACTION_WIDTH + PADDING) * column
        element.position.y = (ACTION_HEIGHT + PADDING) * row
        this.addChild(element)
    }
}
