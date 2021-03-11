import AssetManager from "./AssetManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";
import modelMap1 from "../maps/map1.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.loadImage("girl", "assets/girl.png");
assets.loadImage("skelly", "assets/skelly.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadAudio("coin", "assets/coin.wav");
assets.loadAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;
const scene1 = new Scene(canvas, assets);

const map1 = new Map(10, 14, 32);
map1.loadMap(modelMap1);
scene1.configureMap(map1);

const pc = new Sprite({ x: 50, y: 90, vx: 10 });
const en1 = new Sprite({ x: 160, vx: -10, color: "red" });
const en2 = new Sprite({ x: 115, y: 70, vy: 10, color: "red" });
const en3 = new Sprite({ x: 115, y: 160, vy: -10, color: "red" });

scene1.addSprite(pc);
scene1.addSprite(en1);
scene1.addSprite(en2);
scene1.addSprite(en3);

scene1.initiate();

document.addEventListener("keydown", (evt) => {
  switch (evt.key) {
    case "s":
      scene1.initiate();
      break;
    case "S":
      scene1.stop();
      break;
    case "c":
      assets.play("coin");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
