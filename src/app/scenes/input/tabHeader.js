import * as PIXI from 'pixi.js'

export default class TabHeader extends PIXI.Container {
    constructor(params, tabChangeListener) {
        super()

        this.params = params
        this.tabChangeListener = tabChangeListener
        this.init()
    }

    init() {
        let previousX = 0
        this.params.forEach(tabParam => {
            const tab = new TabItem(tabParam)
            tab.x = previousX
            previousX = tab.x + tab.width

            tab.setActive(tabParam.isActive)
            tab.interactive = true
            tab.on('click', e => this.onTabClick(e))
            this.addChild(tab)
        })
    }

    onTabClick(event) {
        const index = this.children.indexOf(event.currentTarget)
        const param = this.params[index]

        if (param.isActive) return

        this.params.forEach(param => param.isActive = false)
        this.children.forEach(child => child.setActive(false))
        param.isActive = true
        event.currentTarget.setActive(true)

        if (this.tabChangeListener) {
            this.tabChangeListener(index)
        }
    }
}

class TabItem extends PIXI.Container {
    constructor(tabParam) {
        super()

        this.tabParam = tabParam
        this.init()
    }

    init() {
        const text = new PIXI.Text(this.tabParam.header)

        this.bg = new PIXI.Graphics()
        this.bg.beginFill(0xFFFFFF, 1.0)
        this.bg.drawRect(0, 0, text.width, text.height)
        this.bg.endFill()

        this.addChild(this.bg, text)
    }

    setActive(active) {
        this.bg.alpha = active ? 1 : 0
    }
}