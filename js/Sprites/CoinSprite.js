import Sprite from "./Sprite.js";

export default class CoinSprite extends Sprite {
  draw(ctx, dt) {
    this.frameRunning(dt);
    ctx.drawImage(
      this.image,
      Math.floor(this.frame) * 16,
      this.postures[this.posture].row * 16,
      16,
      16,
      this.x - this.scene.map.SIZE / 2,
      this.y - this.scene.map.SIZE / 2 - this.h,
      this.scene.map.SIZE / 2,
      this.scene.map.SIZE / 2
    );
  }
}
