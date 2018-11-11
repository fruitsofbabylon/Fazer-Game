import * as PIXI from 'pixi.js'
import { BaseScene } from "../baseScene";
import SequenceActionDragContainer from './sequenceActionDrag';
import SequenceActionDropContainer from './sequenceActionDrop';

export default class SequenceInputScene extends BaseScene {
    constructor(config){
        super(config)

        this.init()
    }

    init() {
        this.actionsIds = [
            'actions/dough',
            'actions/oven',
            'actions/cut',
            'actions/sauce'
        ]

        const dragContainer = new SequenceActionDragContainer(this.actionsIds, 2, event => this.startDrag(event))
        const dropContainer = new SequenceActionDropContainer(4)

        dropContainer.position = new PIXI.Point(10, 10)
        dragContainer.position = new PIXI.Point(dropContainer.x, dropContainer.y + dropContainer.height + 64)

        this.addChild(dropContainer, dragContainer)

        this.dragContainer = dragContainer
        this.dropContainer = dropContainer
    }

    startDrag(event) {
        const element = event.currentTarget
        const position = event.data.getLocalPosition(this)

        element.on('mousemove', event => this.drag(event))
        element.on('mouseup', event => this.stopDrag(event.currentTarget))

        this.addChild(element)
        element.position = centerPosition(element, position)
    }

    drag(event) {
        const element = event.currentTarget
        const position = event.data.getLocalPosition(this)

        element.position = centerPosition(element, position)
        this.dropContainer.onDrag(element)
    }

    stopDrag(element) {
        element.removeAllListeners('mousemove')
        element.removeAllListeners('mouseup')
        this.removeChild(element)

        if (this.dropContainer.onStopDrag(element)) {

        } else {
            this.dragContainer.onStopDrag(element)
        }
    }
}

function centerPosition(element, position) {
    return new PIXI.Point(position.x - element.width / 2, position.y - element.height / 2)
}