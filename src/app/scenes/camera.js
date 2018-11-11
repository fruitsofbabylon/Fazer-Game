import * as PIXI from 'pixi.js'
import * as _ from 'tracking'
import { BaseScene } from './baseScene';

const tracking = window.tracking

export default class CameraScene extends BaseScene {
  constructor(config) {
    super(config)

    // Video HTML5 element
    this.video = document.getElementById('cameraVideo')
    this.init()
  }

  init() {
    this.setupVideo()
  }

  setupVideo() {
    // Ask user permission
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 640,
        height: 360,
        frameRate: 30
      }
    })
    .then(stream => {
      // Assign video stream to video element
      this.video.srcObject = stream
    })
    .catch(err => {
      alert(err)
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
        const rect = new PIXI.Graphics()
        rect.beginFill(0xFFFFFF, 1.0)
        rect.drawRect(i.x * widthRatio, i.y * heightRatio, i.width * widthRatio, i.height * heightRatio)
        rect.endFill()
        this.addChild(rect)
      })
    })
    // tracking.track('#cameraVideo', this.tracker)
  }
}
