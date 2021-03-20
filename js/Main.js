import AssetManager from "./AssetManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import GenerateSprite from "./GenerateSprite.js";
import modelMap1 from "../maps/map1.js";
import InputManager from "./InputManager.js";
import Sprite from "./Sprite.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.loadImage("girl", "assets/girl.png");
assets.loadImage("skelly", "assets/skelly.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadImage("terrain", "assets/terrain_atlas.png");
assets.loadAudio("coin", "assets/coin.wav");
assets.loadAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 64;
canvas.height = 10 * 64;

input.configKeyboard({
  ArrowLeft: "MOVE_LEFT",
  ArrowRight: "MOVE_RIGHT"
})

const scene1 = new Scene(canvas, assets);

const map1 = new Map();
map1.loadMap(modelMap1);
scene1.configureMap(map1);

const pc = new Sprite({x: 96, y: 96});
pc.control = function(dt) {
  if(input.commands.get("MOVE_LEFT")) {
    this.vx = -50; 
  } else if(input.commands.get("MOVE_RIGHT")) {
    this.vx = 50; 
  } else {
    this.vx = 0;
  }
}
scene1.addSprite(pc);

// const generate = new GenerateSprite(scene1);
// generate.create();
// generate.create();
// generate.create();
// generate.create();
// generate.create();

setInterval(() => {
  console.log('Created')
  generate.create();
}, 4000)

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
