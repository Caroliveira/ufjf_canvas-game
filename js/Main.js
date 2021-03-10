import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scene1 = new Scene(canvas);
scene1.draw();

const pc = new Sprite();
const en1 = new Sprite({ x: 140, w: 30, color: "red" });

pc.draw(ctx);
en1.draw(ctx);
