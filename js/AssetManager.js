export default class AssetManager {
  constructor() {
    this.toLoad = 0;
    this.loaded = 0;
    this.images = new Map();
  }

  loadImage(key, src) {
    const img = new Image();
    img.src = src;
    this.images.set(key, img);
  }

  getImage(key) {
    return this.images.get(key);
  }

  progress() {
    if (this.toLoad > 0) {
      return `${((this.loaded / this.toLoad) * 100).toFixed(2)}%`;
    }
    return "Nada a carregar";
  }
}
