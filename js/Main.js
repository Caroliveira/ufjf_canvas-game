import Scene from './Scene.js';

const canvas = document.querySelector("canvas");
console.log(canvas);

const scene1 = new Scene(canvas);
scene1.draw()