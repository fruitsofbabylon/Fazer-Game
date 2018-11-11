import * as PIXI from 'pixi.js'
import * as _ from 'tracking'
import { BaseScene } from './baseScene';
import colors from '../colors';

const tracking = window.tracking

export default class CameraScene extends BaseScene {
  constructor(config, colorTrackListener) {
    super(config)

    // Video HTML5 element
    this.video = document.getElementById('cameraVideo')
    this.colorTrackListener = colorTrackListener
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
    const colorNames = Object.keys(colors)
    colorNames.forEach(colorName => {
      const colorFunction = colors[colorName].colorFunction
      if (colorFunction) {
        tracking.ColorTracker.registerColor(colorName, colorFunction)
      }
    })

    this.tracker = new tracking.ColorTracker(colorNames)
    this.tracker.on('track', event => this.colorTrackListener(event))
    tracking.track('#cameraVideo', this.tracker)
  }
}
