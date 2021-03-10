import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scene1 = new Scene(canvas);

const pc = new Sprite({ vx: 10 });
const en1 = new Sprite({ x: 140, w: 30, color: "red" });

scene1.addSprite(pc);
scene1.addSprite(en1);

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
