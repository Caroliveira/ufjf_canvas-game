import CoinSprite from "./CoinSprite.js";

export default class GenerateCoinSprite {
  constructor(scene) {
    this.scene = scene;
  }

  generatePosition() {
    const x = Math.floor(Math.random() * 14);
    const y = Math.floor(Math.random() * 10);

    const position = { x: x * 64 + this.scene.map.SIZE / 2, y: y * 64 + this.scene.map.SIZE / 2 };
    if (this.scene.map.tiles[y][x] != 1) return position;
    this.generatePosition();
  }

  create(imageKey, tags) {
    const sprite = new CoinSprite({
      ...this.generatePosition(),
      image: this.scene.assets?.getImage(imageKey),
      tags: tags,
      posture: 0,
      postures: [{ row: 0, init: 0, end: 7, vel: 5, action: "rotate" }]
    });
    this.scene.addSprite(sprite);
  }
}
