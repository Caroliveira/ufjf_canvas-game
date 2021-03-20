import AssetManager from "./AssetManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import GenerateSprite from "./GenerateSprite.js";
import modelMap1 from "../maps/map1.js";
import InputManager from "./InputManager.js";
import Sprite from "./Sprite.js";
import Game from "./Game.js";

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
  ArrowRight: "MOVE_RIGHT",
  ArrowUp: "MOVE_UP",
  ArrowDown: "MOVE_DOWN"
})

const game = new Game(canvas, assets, input);
const scene1 = new Scene(canvas, assets);
game.addScene("game", scene1);

const map1 = new Map();
map1.loadMap(modelMap1);
scene1.configureMap(map1);

const pc = new Sprite({x: 96, y: 96, control: function(dt) {
  if(input.commands.get("MOVE_LEFT")) {
    this.vx = -50; 
  } else if(input.commands.get("MOVE_RIGHT")) {
    this.vx = 50; 
  } else {
    this.vx = 0;
  }
  if(input.commands.get("MOVE_UP")) {
    this.vy = -50; 
  } else if(input.commands.get("MOVE_DOWN")) {
    this.vy = 50; 
  } else {
    this.vy = 0;
  }
}});
scene1.addSprite(pc);

function chasePC(dt) {
  this.vx = 30*Math.sign(pc.x-this.x);
  this.vy = 30*Math.sign(pc.y-this.y);
}

const en1 = new Sprite({x: 12 * 64 + 10, color: "red", control: chasePC});
const en2 = new Sprite({x: 6 * 64 + 10, color: "red", control: chasePC});
const en3 = new Sprite({x: 64 + 10, y: 3 * 64 + 10, color: "red", control: chasePC});
scene1.addSprite(en1);
scene1.addSprite(en2);
scene1.addSprite(en3);

setInterval(() => {
  console.log('Created')
  generate.create();
}, 4000)

scene1.initiate();

document.addEventListener("keydown", (evt) => {
  switch (evt.key) {
    case "s":
      game.initiate();
      break;
    case "S":
      game.stop();
      break;
    case "c":
      assets.play("coin");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
