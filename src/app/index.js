import Phaser from 'phaser';
import RootScene from './scenes/root.js'

const config = {
  type: Phaser.WEBGL,
  width: 1200,
  height: 720,
  scene: new RootScene(1200, 720)
};

const game = new Phaser.Game(config);
