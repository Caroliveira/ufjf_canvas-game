import Scene from "./Scene.js";
import PCSprite from "../Sprites/PCSprite.js";
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
    
    const pc = new PCSprite({
      x: 96,
      y: 96,
      image: this.assets?.getImage("girl"),
      tags: ["pc"],
    });
    this.addSprite(pc);

    // function chasePC(dt) {
    //   this.vx = 30 * Math.sign(pc.x - this.x);
    //   this.vy = 30 * Math.sign(pc.y - this.y);
    // }

    // const en1 = new Sprite({
    //   x: 12 * 64 + 10,
    //   color: "red",
    //   control: chasePC,
    //   tags: ["enemy"],
    // });
    // const en2 = new Sprite({
    //   x: 6 * 64 + 10,
    //   color: "red",
    //   control: chasePC,
    //   tags: ["enemy"],
    // });
    // const en3 = new Sprite({
    //   x: 64 + 10,
    //   y: 3 * 64 + 10,
    //   color: "red",
    //   control: chasePC,
    //   tags: ["enemy"],
    // });
    // this.addSprite(en1);
    // this.addSprite(en2);
    // this.addSprite(en3);
  }
}
