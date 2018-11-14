import * as PIXI from 'pixi.js'
import { BaseScene } from "../baseScene";
import SequenceActionDragContainer from './sequenceActionDrag';
import SequenceActionDropContainer from './sequenceActionDrop';
import { runInThisContext } from 'vm';

export default class SequenceInputScene extends BaseScene {
    constructor(config, onRun){
        super(config)

        this.onRun = onRun

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
        
        const button = new Button("", 0xFF0000, 100, 50)
        button.position = {
            x: this.sceneConfig.width - button.width - 50,
            y: this.sceneConfig.height - button.height - 50
        }
        button.on('pointerdown', () => this.runActions())
        this.addChild(button)
    }

    runActions() {
        const actions = this.dropContainer.getActions()
        this.onRun(actions)
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

class Button extends PIXI.Container {
    constructor(text, bg, width, height) {
        super()

        this.text = text
        this.bgColor = bg
        this.buttonWidth = width
        this.buttonHeight = height
        this.interactive = true
        this.buttonMode = true

        this.on('pointerover', event => this.onHoverEnter())
        this.on('pointerout', event => this.onHoverExit())

        this.init()
    }

    init() {
        this.bg = new PIXI.Graphics()
        this.drawBg(0.6)

        this.text = new PIXI.Text(this.text)
        //this.text.position = centerPosition(this.text, new PIXI.Point(this.buttonWidth / 2, this.buttonHeight / 2))
        this.addChild(this.bg, this.text)
    }

    onHoverEnter() {
        this.drawBg(1.0)
    }

    onHoverExit() {
        this.drawBg(0.6)
    }

    drawBg(alpha) {
        this.bg.clear()
        this.bg.beginFill(this.bgColor, alpha)
        this.bg.drawRoundedRect(0, 0, this.buttonWidth, this.buttonHeight, this.buttonHeight / 4)
        this.bg.endFill()
    }
}