import * as PIXI from 'pixi.js'
import RootScene from './scenes/root.js'

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
game.stage.addChild(new RootScene(width, height))

console.log(game)
