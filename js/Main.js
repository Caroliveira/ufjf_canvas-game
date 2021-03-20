import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import SceneGame from "./SceneGame.js";
import SceneLoading from "./SceneLoading.js";
import SceneEnd from "./SceneEnd.js";

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
  ArrowDown: "MOVE_DOWN",
  " ": "NEXT_SCENE",
});

const game = new Game(canvas, assets, input);
const scene0 = new SceneLoading();
const scene1 = new SceneGame();
const scene2 = new SceneEnd();
game.addScene("loading", scene0);
game.addScene("game", scene1);
game.addScene("end", scene2);

game.initiate();

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
