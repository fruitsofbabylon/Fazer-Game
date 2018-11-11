import * as PIXI from 'pixi.js'

const resources = PIXI.loader.resources
const ACTION_WIDTH = 64
const ACTION_HEIGHT = 64
const LINE_WIDTH = 1

export default class SequenceActionDropContainer extends PIXI.Container {
    constructor(length) {
        super()
        this.length = length
        this.init()
    }
    init() {
        let previousX = 0
        for (let i = 0; i < this.length; i++) {
            let holder = new ActionHolder(ACTION_WIDTH, ACTION_HEIGHT)
            holder.x = previousX
            this.addChild(holder)

            if (i < this.length - 1) {
                const arrowSprite = new PIXI.Sprite(resources["arrow"].texture)
                arrowSprite.width = ACTION_WIDTH / 2
                arrowSprite.height = ACTION_HEIGHT / 2
                arrowSprite.x = previousX + ACTION_WIDTH + ACTION_WIDTH / 4
                arrowSprite.y = ACTION_HEIGHT / 4
                this.addChild(arrowSprite)
            }

            previousX += ACTION_WIDTH * 2
        }
    }

    onDrag(element) {
        const holders = this.findHolder(element)
        
        // Update holder bg
        if (holders.length > 0) {
            const holder = holders[0]
            // Clear old active holder
            if (this.activeHolder) {
               this.activeHolder.drawInactive()
            }
            // Highlight a new one
            holder.drawActive()
            this.activeHolder = holder
        } else if (this.activeHolder) {
            this.activeHolder.drawInactive()
            this.activeHolder = null
        }
    }

    onStopDrag(element) {
        if (!this.activeHolder) return false

        const previousAction = this.activeHolder.addAction(element)

        this.activeHolder.drawInactive()
        this.activeHolder = null
        return true
    }

    findHolder(element) {
        const rect = element.getBounds(true)
        const topLeft = new PIXI.Point(rect.x, rect.y)
        const topRight = new PIXI.Point(rect.x + rect.width, rect.y)
        const bottomLeft = new PIXI.Point(rect.x, rect.y + rect.height)
        const bottomRight = new PIXI.Point(rect.x + rect.width, rect.y + rect.height)

        const possibleHolders = [
            this.children.find(child => pointInside(child, this.toLocal(topLeft, element))),
            this.children.find(child => pointInside(child, this.toLocal(topRight, element))),
            this.children.find(child => pointInside(child, this.toLocal(bottomLeft, element))),
            this.children.find(child => pointInside(child, this.toLocal(bottomRight, element)))
        ].filter(child => !!child)

        return possibleHolders
    }
}

function pointInside(child, point) {
    const bounds = new PIXI.Rectangle(child.x, child.y, child.width, child.height)
    return child instanceof ActionHolder && bounds.contains(point.x, point.y)
}

class ActionHolder extends PIXI.Container {
    constructor(width, height) {
        super()

        this.init(width, height)
    }

    init(width, height) {
        this.bg = new PIXI.Graphics()
        this.bg.width = width
        this.bg.height = height
        this.drawInactive()
        this.addChild(this.bg)
    }
    
    drawInactive() {
        this.bg.clear()
            .lineStyle(LINE_WIDTH, 0x000000, 1.0)
            .beginFill(0xFFFFFF, 0.0)
            .drawRect(0, 0, ACTION_WIDTH, ACTION_HEIGHT)
            .endFill()
    }
    
    drawActive() {
        this.bg.clear()
            .lineStyle(LINE_WIDTH, 0x000000, 1.0)
            .beginFill(0xFFFFFF, 1.0)
            .drawRect(0, 0, ACTION_WIDTH, ACTION_HEIGHT)
            .endFill()
    }

    addAction(element) {
        const previousAction = this.action

        element.position = new PIXI.Point(0, 0)
        this.action = element
        this.addChild(element)

        return previousAction
    }
}
