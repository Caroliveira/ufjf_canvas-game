import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const assets = new AssetManager();

assets.loadImage("girl", "assets/girl.png");
assets.loadImage("skelly", "assets/skelly.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadAudio("coin", "assets/coin.wav");
assets.loadAudio("boom", "assets/boom.wav");

const mixer = new Mixer(10);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scene1 = new Scene(canvas, assets);

const pc = new Sprite({ vx: 10 });
const en1 = new Sprite({ x: 140, w: 30, color: "red" });
const en2 = new Sprite({ y: 40, w: 30, color: "red" });

scene1.addSprite(pc);
scene1.addSprite(en1);
scene1.addSprite(en2);

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
      mixer.play(assets.getAudio("coin"));
      break;
    case "b":
      mixer.play(assets.getAudio("boom"));
      break;
  }
});
