import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scene1 = new Scene(canvas);

const pc = new Sprite();
const en1 = new Sprite({ x: 140, w: 30, color: "red" });

scene1.addSprite(pc);
scene1.addSprite(en1);

scene1.frame(0);
