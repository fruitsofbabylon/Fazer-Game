import * as PIXI from 'pixi.js'
import ColorActionElement from '../visual/colorAction';

export default class InputScene extends PIXI.Container {
  constructor(config) {
    super()
    this.x = config.x
    this.y = config.y

    this.sceneConfig = {
      width: config.width,
      height: config.height
    }

    this.init()
  }

  init() {
    const bg = new PIXI.Graphics()
    bg.beginFill(0xDEDEDE, 1.0)
    bg.drawRect(0, 0, this.sceneConfig.width, this.sceneConfig.height)
    bg.endFill()

    const actions = new PIXI.Container()
    const params = [
      { color: 'cyan', icon: 'actions/dough' },
      { color: 'magenta', icon: 'actions/oven' },
      { color: 'yellow', icon: 'actions/cut' },
      { color: 'green', icon: 'actions/sauce' },      
    ]

    let previousY = 0
    params.forEach((param) => {
      const action = new ColorActionElement( param.color, param.icon )
      action.y = previousY
      previousY = action.y + action.height + 10
      actions.addChild(action)
    })

    const actionsCenter = new PIXI.Point(
      actions.width / 2, 
      actions.height / 2
    )
    const sceneCenter = new PIXI.Point(
      this.sceneConfig.width /2,
      this.sceneConfig.height /2
    )
    actions.position.x = sceneCenter.x - actionsCenter.x
    actions.position.y = sceneCenter.y - actionsCenter.y

    this.addChild(
      bg,
      actions
    )
  }

}
