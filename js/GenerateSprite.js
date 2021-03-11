import Sprite from "./Sprite.js";

export default class GenerateSprite {
  constructor(scene1) {
    this.scene = scene1;
  }

  generatePosition() {
    const x = Math.floor(Math.random() * 14);
    const y = Math.floor(Math.random() * 10);

    const position = { x: x * 64 + 10, y: y * 64 + 10 };
    console.log(position);
    if (this.scene.map.tiles[y][x] != 1) return position;
    this.generatePosition();
  }

  generateDirection() {
    const dir = [
      { vx: 10, vy: 0 },
      { vx: -10, vy: 0 },
      { vx: 0, vy: -10 },
      { vx: 0, vy: 10 },
    ];
    const result = dir[Math.floor(Math.random() * 4)];
    console.log(result);
    return result;
  }

  create() {
    const sprite = new Sprite({
      ...this.generatePosition(),
      ...this.generateDirection(),
    });
    this.scene.addSprite(sprite);
  }
}
