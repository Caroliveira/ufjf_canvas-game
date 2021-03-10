export default class AssetManager {
  constructor() {
    this.toLoad = 0;
    this.loaded = 0;
  }

  progress() {
    if (this.toLoad > 0) {
      return `${((this.loaded / this.toLoad) * 100).toFixed(2)}%`;
    }
    return "Nada a carregar";
  }
}
