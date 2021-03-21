import Scene from "./Scene.js";
import Sprite from "../Sprites/Sprite.js";
import Map from "../Map.js";
import modelMap1 from "../maps/map1.js";

export default class SceneGame extends Scene {
  onCrash(a, b) {
    if (!this.toRemove.includes(a)) {
      this.toRemove.push(a);
      this.assets.play("boom");
    }
    if (!this.toRemove.includes(b)) {
      this.toRemove.push(b);
      this.assets.play("boom");
    }
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.game.selectScene("end");
    }
  }

  setup() {
    super.setup();
    const map1 = new Map();
    map1.loadMap(modelMap1);
    this.configureMap(map1);

    const scene = this;
    const pc = new Sprite({
      x: 96,
      y: 96,
      control: function (dt) {
        if (scene.input.commands.get("MOVE_LEFT")) {
          this.vx = -50;
        } else if (scene.input.commands.get("MOVE_RIGHT")) {
          this.vx = 50;
        } else {
          this.vx = 0;
        }
        if (scene.input.commands.get("MOVE_UP")) {
          this.vy = -50;
        } else if (scene.input.commands.get("MOVE_DOWN")) {
          this.vy = 50;
        } else {
          this.vy = 0;
        }
      },
      tags: ["pc"],
    });
    this.addSprite(pc);

    function chasePC(dt) {
      this.vx = 30 * Math.sign(pc.x - this.x);
      this.vy = 30 * Math.sign(pc.y - this.y);
    }

    const en1 = new Sprite({
      x: 12 * 64 + 10,
      color: "red",
      control: chasePC,
      tags: ["enemy"],
    });
    const en2 = new Sprite({
      x: 6 * 64 + 10,
      color: "red",
      control: chasePC,
      tags: ["enemy"],
    });
    const en3 = new Sprite({
      x: 64 + 10,
      y: 3 * 64 + 10,
      color: "red",
      control: chasePC,
      tags: ["enemy"],
    });
    this.addSprite(en1);
    this.addSprite(en2);
    this.addSprite(en3);
  }
}
