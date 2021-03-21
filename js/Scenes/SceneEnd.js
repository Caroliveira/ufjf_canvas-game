import Scene from "./Scene.js";

export default class SceneEnd extends Scene {
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    if (this.assets.finish()) {
      this.ctx.fillStyle = "yellow";
      this.ctx.fillText(
        "Aperte espaço para jogar novamente",
        this.canvas.width / 2,
        this.canvas.height / 2 + 40
      );
    }
  }

  frame(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    if (this.assets.finish() && this.input.commands.get("NEXT_SCENE")) {
        this.game.selectScene("game");
        return;
      }
    this.draw();
    this.initiate();
    this.t0 = t;
  }
}
