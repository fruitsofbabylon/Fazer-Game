import * as PIXI from 'pixi.js'
import { BaseScene } from "../baseScene";
import SequenceActionDragContainer from './sequenceActionDrag';
import SequenceActionDropContainer from './sequenceActionDrop';
import { runInThisContext } from 'vm';

export default class SequenceInputScene extends BaseScene {
    constructor(config){
        super(config)

        this.init()

        // Hack around drag problems
        this.dragListener = (event => this.drag(event))
        this.dragStopListener = (event => this.stopDrag(event.currentTarget))
        this.dragElement = null
    }

    init() {
        this.actionsIds = [
            'actions/dough',
            'actions/oven',
            'actions/cut',
            'actions/sauce',
            'actions/topping'
        ]

        const dragContainer = new SequenceActionDragContainer(this.actionsIds, 3, event => this.startDrag(event))
        const dropContainer = new SequenceActionDropContainer(5)

        dropContainer.position = new PIXI.Point(10, 10)
        dragContainer.position = new PIXI.Point(dropContainer.x, dropContainer.y + dropContainer.height + 64)

        this.addChild(dropContainer, dragContainer)

        this.dragContainer = dragContainer
        this.dropContainer = dropContainer
    }

    startDrag(event) {
        const element = event.currentTarget
        const position = event.data.getLocalPosition(this)

        window.addEventListener('mousemove', this.dragListener)
        window.addEventListener('mouseup', this.dragStopListener)

        this.addChild(element)
        element.position = centerPosition(element, position)

        this.dragElement = element
    }

    drag(event) {
        const element = this.dragElement
        const eventPosition = new PIXI.Point(event.clientX, event.clientY)
        const position = this.toLocal(eventPosition)

        element.position = centerPosition(element, position)
        this.dropContainer.onDrag(element)
    }

    stopDrag(event) {
        const element = this.dragElement

        window.removeEventListener('mousemove', this.dragListener)
        window.removeEventListener('mouseup', this.dragStopListener)
        this.removeChild(element)
        this.dragElement = null

        const [accepted, actionToReturnBack] = this.dropContainer.onStopDrag(element)
        if (accepted) {
            if (actionToReturnBack) this.dragContainer.onStopDrag(actionToReturnBack)
        } else {
            this.dragContainer.onStopDrag(element)
        }
    }
}

function centerPosition(element, position) {
    return new PIXI.Point(position.x - element.width / 2, position.y - element.height / 2)
}
