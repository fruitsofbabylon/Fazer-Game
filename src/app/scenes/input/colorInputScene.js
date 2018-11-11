import { BaseScene } from "../baseScene";
import ColorActionElement from './colorAction';
import { levels, currentLevel } from "../../levels";

export default class ColorInputScene extends BaseScene {
    constructor(config) {
        super(config)
    
        this.init()
    }

    init() {
        const actions = new PIXI.Container()
        const params = levels[currentLevel].actions
    
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