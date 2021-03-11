export default class Map {
  constructor(rows = 8, columns = 12, size = 32) {
    this.ROWS = rows;
    this.COLUMNS = columns;
    this.SIZE = size;
    this.tiles = [];
    for (let r = 0; r < this.ROWS; r++) {
      this.tiles[r] = [];
      for (let c = 0; c < this.COLUMNS; c++) {
        this.tiles[r][c] = 0;
      }
    }
    this.scene = null
  }

  draw(ctx) {
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLUMNS; c++) {
        switch (this.tiles[r][c]) {
            case 1:
                ctx.fillStyle = 'grey';
                ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
                ctx.lineWidth = 1
                ctx.strokeStyle = "black";
                ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
                break;
            default:
                ctx.fillStyle = 'black';
                ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
                ctx.lineWidth = 1
                ctx.strokeStyle = "grey";
                ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
                break;
        }
      }
    }
  }
}
