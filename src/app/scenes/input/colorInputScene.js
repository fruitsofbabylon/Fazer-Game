import { BaseScene } from "../baseScene";
import ColorActionElement from './colorAction';

export default class ColorInputScene extends BaseScene {
    constructor(config) {
        super(config)
    
        this.init()
    }

    init() {
        const actions = new PIXI.Container()
        const params = [
          { color: 'cyan', icon: 'actions/dough' },
          { color: 'magenta', icon: 'actions/oven' },
          { color: 'yellow', icon: 'actions/cut' },
          { color: 'green', icon: 'actions/sauce' },
          { color: 'red', icon: 'actions/topping' }      
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
    
        this.addChild(actions)
    }
}