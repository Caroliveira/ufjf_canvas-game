import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const img1 = new Image();
img1.src="assets/girl.png";
const img2 = new Image();
img2.src="assets/skelly.png";
const img3 = new Image();
img3.src="assets/orc.png";
document.body.appendChild(img1);
document.body.appendChild(img2);
document.body.appendChild(img3);

const assets = new AssetManager();

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

    default:
      break;
  }
});
