export default class Sprite {
  // Responsável por modelar algo que se move na tela
  constructor({
    x = 100,
    y = 100,
    w = 20,
    h = 20,
    vx = 0,
    vy = 0,
    color = "white",
  } = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }

  step(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
  }

  crash(sprite) {
    return !(
      this.x - this.w / 2 > sprite.x + sprite.w / 2 ||
      this.x + this.w / 2 < sprite.x - sprite.w / 2 ||
      this.y - this.h / 2 > sprite.y + sprite.h / 2 ||
      this.y + this.h / 2 < sprite.y - sprite.h / 2
    );
  }
}
