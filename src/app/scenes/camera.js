import * as PIXI from 'pixi.js'
import * as _ from 'tracking'

const tracking = window.tracking

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
    this.video = document.getElementById('cameraVideo')
    this.init()
  }

  init() {
    const bg = new PIXI.Graphics()
    bg.beginFill(0xFFFFFF, 1.0)
    bg.drawRect(this.x, this.y, this.sceneConfig.width, this.sceneConfig.height)
    bg.endFill()
    this.addChild(bg)

    this.setupVideo()
  }

  setupVideo() {
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

    this.setupTracking()
  }

  setupTracking() {
    const widthRatio = this.sceneConfig.width / this.video.width
    const heightRatio = this.sceneConfig.height / this.video.height

    const childSize = this.children.length

    this.tracker = new tracking.ColorTracker('cyan')
    this.tracker.on('track', event => {
      const newSize = this.children.length
      for (let i = childSize; i < newSize; i++) {
        this.removeChildAt(i)
      }

      event.data.forEach(i => {
        console.log('drawing... ' + i)
        const rect = new PIXI.Graphics()
        rect.beginFill(0xFFFFFF, 1.0)
        rect.drawRect(i.x * widthRatio, i.y * heightRatio, i.width * widthRatio, i.height * heightRatio)
        rect.endFill()
        this.addChild(rect)
      })
    })
    tracking.track('#cameraVideo', this.tracker)
  }
}
