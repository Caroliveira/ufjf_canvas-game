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
    this.scene = null;
    this.mx = 0;
    this.my = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      this.mx * this.scene.map.SIZE,
      this.my * this.scene.map.SIZE,
      this.scene.map.SIZE,
      this.scene.map.SIZE
    );
  }

  step(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.scene.map.SIZE);
    this.my = Math.floor(this.y / this.scene.map.SIZE);
  }

  crash(sprite) {
    return !(
      this.x - this.w / 2 > sprite.x + sprite.w / 2 ||
      this.x + this.w / 2 < sprite.x - sprite.w / 2 ||
      this.y - this.h / 2 > sprite.y + sprite.h / 2 ||
      this.y + this.h / 2 < sprite.y - sprite.h / 2
    );
  }

  applyRestrictions(dt) {
    this.applyRestrictionsRight(dt);
    this.applyRestrictionsLeft(dt);
  }

  applyRestrictionsRight(dt) {
    const SIZE = this.scene.map.SIZE;
    if (this.vx > 0) {
      const pmx = this.mx + 1;
      const pmy = this.my;
      if (this.scene.map.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        this.scene.ctx.strokeStyle = "white";
        this.scene.ctx.strokeRect(tile.x - SIZE/2, tile.y - SIZE/2, SIZE, SIZE);
        if (this.crash(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
        }
      }
    }
  }

  applyRestrictionsLeft(dt) {
    const SIZE = this.scene.map.SIZE;
    if (this.vx < 0) {
      const pmx = this.mx - 1;
      const pmy = this.my;
      if (this.scene.map.tiles[pmy][pmx] != 0) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        this.scene.ctx.strokeStyle = "white";
        this.scene.ctx.strokeRect(tile.x - SIZE/2, tile.y - SIZE/2, SIZE, SIZE);
        if (this.crash(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
        }
      }
    }
  }
}
