import Sprite from "./Sprite.js";

export default class DoorSprite extends Sprite {
  draw(ctx, dt) {
    ctx.drawImage(
      this.image,
      Math.floor(this.frame) * 16,
      this.postures[this.posture].row * 32,
      16,
      32,
      this.x - this.scene.map.SIZE / 2,
      this.y - this.scene.map.SIZE / 2 - this.h,
      this.scene.map.SIZE/2,
      this.scene.map.SIZE
    );
  }
}
