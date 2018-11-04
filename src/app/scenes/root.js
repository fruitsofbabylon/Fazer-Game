import Phaser from 'phaser';
import OutputScene from './output';
import InputScene from './input';
import CameraScene from './camera';

export default class RootScene extends Phaser.Scene {
  constructor(width, height) {
    super({ key: "Root", active: true })
    this.width = width
    this.height = height
  }
  preload() {
    const graphics = this.add.graphics()
    graphics.fillStyle(0xebebeb, 1.0)
    graphics.fillRect(0, 0, this.width, this.height)

    this.scene.add(
      'Output',
      new OutputScene({
        key: 'Output',
        x: 0, 
        y: 0, 
        width: this.width / 2, 
        height: this.height
      }),
      true
    )

    this.scene.add(
      'Input',
      new InputScene({
        key: 'Input',
        x: this.width / 2, 
        y: this.height / 3, 
        width: this.width / 2, 
        height: this.height / 3 * 2
      }),
      true
    )

    this.scene.add(
      'Camera',
      new CameraScene({
        key: 'Camera',
        x: this.width / 2, 
        y: 0, 
        width: this.width / 2, 
        height: this.height / 3
      }),
      true
    )
  }


}
