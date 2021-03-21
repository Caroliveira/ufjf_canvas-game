import Sprite from "./Sprite.js";

export default class PCSprite extends Sprite {
  draw(ctx, dt) {
    if (this.vx || this.vy) {
      this.frame =
        this.frame > this.postures[this.posture].end
          ? this.postures[this.posture].init
          : this.frame + this.postures[this.posture].vel * dt;
    } else {
      this.frame = 0;
    }
    
    super.draw(ctx, dt);
  }
  
  control(dt) {
    if (this.scene.input.commands.get("MOVE_LEFT")) {
      this.vx = -64;
      this.posture = 1;
    } else if (this.scene.input.commands.get("MOVE_RIGHT")) {
      this.vx = 64;
      this.posture = 3;
    } else {
      this.vx = 0;
    }
    if (this.scene.input.commands.get("MOVE_UP")) {
      this.vy = -64;
      this.posture = 0;
    } else if (this.scene.input.commands.get("MOVE_DOWN")) {
      this.vy = 64;
      this.posture = 2;
    } else {
      this.vy = 0;
    }
  }
}
