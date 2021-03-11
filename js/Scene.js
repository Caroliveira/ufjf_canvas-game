export default class Scene {
  // Classe responsável por desenhar elementos na tela em uma animação
  constructor(canvas, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.sprites = [];
    this.toRemove = [];
    this.t0 = 0;
    this.dt = 0;
    this.idAnim = null;
    this.assets = assets;
    this.map = null;
  }

  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.map?.draw(this.ctx);

    if (this.assets.finish()) {
      for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.draw(this.ctx);
        sprite.applyRestrictions();
      }
    }
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets.progress() ?? "", 10, 20);
  }

  addSprite(sprite) {
    sprite.scene = this;
    this.sprites.push(sprite);
  }

  step(dt) {
    if (this.assets.finish()) {
      for (const sprite of this.sprites) {
        sprite.step(dt);
      }
    }
  }

  frame(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    this.step(this.dt);
    this.draw();

    this.checkCrash();
    this.removeSprites();

    this.initiate();
    this.t0 = t;
  }

  initiate() {
    this.idAnim = requestAnimationFrame((t) => this.frame(t));
  }

  stop() {
    cancelAnimationFrame(this.idAnim);
    this.t0 = null;
  }

  checkCrash() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const spriteA = this.sprites[a];
      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];
        if (spriteA.crash(spriteB)) {
          this.onCrash(spriteA, spriteB);
        }
      }
    }
  }

  onCrash(a, b) {
    if (!this.toRemove.includes(a)) {
      this.toRemove.push(a);
    }
    if (!this.toRemove.includes(b)) {
      this.toRemove.push(b);
    }
  }

  removeSprites() {
    for (const target of this.toRemove) {
      const idx = this.sprites.indexOf(target);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }
    this.toRemove = [];
  }

  configureMap(map) {
    this.map = map;
    this.map.scene = this;
  }
}
