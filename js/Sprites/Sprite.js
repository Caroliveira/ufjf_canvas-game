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
    tags = [],
    image,
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
    this.tags = new Set();
    tags.forEach((tag) => {
      this.tags.add(tag);
    });
    this.posture = 3;
    this.postures = [
      { row: 8, init: 0, end: 8, vel: 5, action: "up" },
      { row: 9, init: 0, end: 8, vel: 5, action: "left" },
      { row: 10, init: 0, end: 8, vel: 5, action: "down" },
      { row: 11, init: 0, end: 8, vel: 5, action: "right" },
    ];
    this.image = image;
    this.frame = this.postures[this.posture].init;
  }

  draw(ctx, dt) {     
    ctx.drawImage(
      this.image,
      Math.floor(this.frame) * 64,
      this.postures[this.posture].row * 64,
      64,
      64,
      this.x - this.scene.map.SIZE/2,
      this.y - this.scene.map.SIZE/2 - this.h,
      this.scene.map.SIZE,
      this.scene.map.SIZE
    );
  }

  control(dt) {}

  move(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.scene.map.SIZE) ;
    this.my = Math.floor(this.y / this.scene.map.SIZE);
  }

  step(dt) {
    this.control(dt);
    this.move(dt);
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
    const applyAt = [
      { pmx: this.mx + 1, pmy: this.my - 1, direction: "Right" },
      { pmx: this.mx + 1, pmy: this.my, direction: "Right" },
      { pmx: this.mx + 1, pmy: this.my + 1, direction: "Right" },
      { pmx: this.mx - 1, pmy: this.my - 1, direction: "Left" },
      { pmx: this.mx - 1, pmy: this.my, direction: "Left" },
      { pmx: this.mx - 1, pmy: this.my + 1, direction: "Left" },
      { pmx: this.mx - 1, pmy: this.my + 1, direction: "Down" },
      { pmx: this.mx, pmy: this.my + 1, direction: "Down" },
      { pmx: this.mx + 1, pmy: this.my + 1, direction: "Down" },
      { pmx: this.mx - 1, pmy: this.my - 1, direction: "Up" },
      { pmx: this.mx, pmy: this.my - 1, direction: "Up" },
      { pmx: this.mx + 1, pmy: this.my - 1, direction: "Up" },
    ];
    for (const at of applyAt) {
      const SIZE = this.scene.map.SIZE;
      const tile = {
        x: at.pmx * SIZE + SIZE / 2,
        y: at.pmy * SIZE + SIZE / 2,
        w: SIZE,
        h: SIZE,
      };
      this[`applyRestrictions${at.direction}`](at.pmx, at.pmy, tile);
    }
  }

  applyRestrictionsRight(pmx, pmy, tile) {
    if (this.vx > 0) {
      if (this.scene.map.tiles[pmy][pmx] != 0) {
        if (this.crash(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
        }
      }
    }
  }

  applyRestrictionsLeft(pmx, pmy, tile) {
    if (this.vx < 0) {
      if (this.scene.map.tiles[pmy][pmx] != 0) {
        if (this.crash(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
        }
      }
    }
  }

  applyRestrictionsDown(pmx, pmy, tile) {
    if (this.vy > 0) {
      if (this.scene.map.tiles[pmy][pmx] != 0) {
        if (this.crash(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
        }
      }
    }
  }

  applyRestrictionsUp(pmx, pmy, tile) {
    if (this.vy < 0) {
      if (this.scene.map.tiles[pmy][pmx] != 0) {
        if (this.crash(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
        }
      }
    }
  }
}
