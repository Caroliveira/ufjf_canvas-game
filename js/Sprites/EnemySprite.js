import Sprite from "./Sprite.js";

export default class EnemySprite extends Sprite {
  draw(ctx, dt) {
    this.frameRunning(dt);
    super.draw(ctx, dt);
  }

  defineTarget(target) {
    this.target = target;
      if (target.x < this.x) {
        this.posture = 1;
      } else {
        this.posture = 3;
      }
  }

  control(dt) {
    this.vx = 30 * Math.sign(this.target.x - this.x);
    this.vy = 30 * Math.sign(this.target.y - this.y);
    if (this.vx < 0) {
      this.posture = 1;
    } else if (this.vx > 0) {
      this.posture = 3;
    } else if (this.vy < 0) {
      this.posture = 0;
    } else if (this.vy > 0) {
      this.posture = 2;
    }
  }
}
