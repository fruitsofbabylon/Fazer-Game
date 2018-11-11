import * as PIXI from 'pixi.js'

const resources = PIXI.loader.resources
const ACTION_WIDTH = 64
const ACTION_HEIGHT = 64
const LINE_WIDTH = 1

export default class SequenceActionDropContainer extends PIXI.Container {
    constructor(length) {
        super()
        this.length = length
        this.holders = []
        this.init()
    }
    init() {
        let previousX = 0
        for (let i = 0; i < this.length; i++) {
            let holder = new ActionHolder(ACTION_WIDTH, ACTION_HEIGHT)
            holder.x = previousX
            this.holders.push(holder)
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
        const suitableHolders = this.findHolder(element)
        
        // Update holder bg
        if (suitableHolders.length > 0) {
            const holder = suitableHolders[0]
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

    // This method returns pair of "element accepted" and "element to return"
    onStopDrag(element) {
        // Check if this action was in the other holder
        const previousHolder = this.holders.find(it => it.actionId == element.actionId)
        if (previousHolder) {
            previousHolder.clearAction()
        }
        if (!this.activeHolder) return [false]

        let actionToClear = null

        // Check if this action was in the other holder
        if (previousHolder) {
            // Swap with active one
            if (this.activeHolder.action) {
                previousHolder.setAction(this.activeHolder.action)
            } else {
                previousHolder.clearAction()
            }
        // Else check if current holder has an action already set
        } else if (this.activeHolder.action) {
            // Parent will clear it later
            actionToClear = this.activeHolder.action
        }

        this.activeHolder.setAction(element)
        this.activeHolder.drawInactive()
        this.activeHolder = null
        return [true, actionToClear]
    }

    findHolder(element) {
        const rect = element.getBounds(true)
        const topLeft = new PIXI.Point(rect.x, rect.y)
        const topRight = new PIXI.Point(rect.x + rect.width, rect.y)
        const bottomLeft = new PIXI.Point(rect.x, rect.y + rect.height)
        const bottomRight = new PIXI.Point(rect.x + rect.width, rect.y + rect.height)

        const possibleHolders = [
            this.holders.find(child => pointInside(child, this.toLocal(topLeft, element))),
            this.holders.find(child => pointInside(child, this.toLocal(topRight, element))),
            this.holders.find(child => pointInside(child, this.toLocal(bottomLeft, element))),
            this.holders.find(child => pointInside(child, this.toLocal(bottomRight, element)))
        ].filter(child => !!child)

        return possibleHolders
    }
}

function pointInside(child, point) {
    const bounds = new PIXI.Rectangle(child.x, child.y, child.width, child.height)
    return bounds.contains(point.x, point.y)
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

    setAction(element) {
        element.position = new PIXI.Point(0, 0)
        this.action = element
        this.actionId = element.actionId
        this.addChild(element)
    }

    clearAction() {
        this.removeChild(this.action)
        this.action = null
        this.actionId = null
    }
}
