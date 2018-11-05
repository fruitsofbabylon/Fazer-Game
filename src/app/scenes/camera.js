import * as PIXI from 'pixi.js'
import tracking from 'tracking.js'

export default class CameraScene extends PIXI.Container {
  constructor(config) {
    super()
    this.x = config.x
    this.y = config.y

    this.sceneConfig = {
      width: config.width,
      height: config.height
    }

    // Video HTML5 element
    this.video = document.createElement('video')
    this.video.setAttribute('width', 1280)
    this.video.setAttribute('height', 720)

    this.init()
  }

  init() {
    const bg = new PIXI.Graphics()
    bg.beginFill(0xFFFFFF, 1.0)
    bg.drawRect(this.x, this.y, this.sceneConfig.width, this.sceneConfig.height)
    bg.endFill()
    this.addChild(bg)

    // Ask user permission
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 1280,
        height: 720,
        frameRate: 30
      }
    }).then(stream => {
      // Assign video stream to video element
      this.video.srcObject = stream
    })
    .catch(err => {
      console.error(err)
    })

    // Create pixi sprite from video element
    const videoSprite = new PIXI.Sprite(
      new PIXI.Texture.fromVideo(this.video)
    )
    videoSprite.width = this.sceneConfig.width
    videoSprite.height = this.sceneConfig.height
    this.addChild(videoSprite)
  }

}
