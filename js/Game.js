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
    if (this.scene === null) {
      this.scene = scene;
    }
  }

  selectScene(key) {
    if (this.scenes.has(key)) {
      this.scene = this.scenes.get(key);
    }
  }

  initiate() {
    this.scene?.initiate();
  }

  stop() {
    this.scene?.stop();
  }
}
