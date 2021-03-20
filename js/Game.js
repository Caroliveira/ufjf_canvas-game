export default class Game {
  constructor(canvas, assets, input) {
    this.canvas = canvas;
    this.assets = assets;
    this.input = input;
    this.scenes = new Map();
    this.scene = null;
  }

  addScene(key, scene) {
      this.scenes.set(key, scene);
      scene.game = this;
      scene.canvas = this.canvas;
      scene.assets = this.assets;
      scene.input = this.input;
  }
}
