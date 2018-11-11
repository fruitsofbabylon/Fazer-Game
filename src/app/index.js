import * as PIXI from 'pixi.js'
import RootScene from './scenes/root.js'
import { SceneConfig } from './scenes/baseScene.js';

const width = 1280
const height = 720

const config = {
  'width': width,
  'height': height,
  'antialias': true,
  'resolution': 1
}

const game = new PIXI.Application(config)
document.body.appendChild(game.view)

PIXI.loader
  .add("actions/dough", "img/actions/dough.png")
  .add("arrow", "img/common/arrow.png")
  .add("actions/oven", "img/actions/oven.png")
  .add("actions/cut", "img/actions/cutter.png")
  .add("actions/sauce", "img/actions/sauce.png")
  .load(loaded)

function loaded() {
  game.stage.addChild(
    new RootScene(
      new SceneConfig(0, 0, width, height, 0xEBEBEB)
    )
  )
}
