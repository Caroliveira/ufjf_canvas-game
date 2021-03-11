export default class Map {
  constructor(rows = 10, columns = 14, size = 64) {
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
    this.scene = null;
  }

  draw(ctx) {
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLUMNS; c++) {
        switch (this.tiles[r][c]) {
          case 1:
            ctx.drawImage(
              this.scene.assets.getImage("terrain"),
              // Pega terreno: parede de pedra
              9 * 59,
              13 * 59,
              // Dimensionamento da grade
              59,
              59,
              // Localização do desenho
              c * 64,
              r * 64,
              // Tamanho do desenho
              64,
              64
            );
            break;
          default:
            ctx.drawImage(
              this.scene.assets.getImage("terrain"),
              // Pega terreno: chão
              15 * 53,
              5 * 53,
              // Dimensionamento da grade
              53,
              53,
              // Localização do desenho
              c * 64,
              r * 64,
              // Tamanho do desenho
              64,
              64
            );
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.strokeRect(c * this.SIZE, r * this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }

  loadMap(model) {
    this.ROWS = model.length;
    this.COLUMNS = model[0]?.length ?? 0;
    this.tiles = [];
    for (let r = 0; r < this.ROWS; r++) {
      this.tiles[r] = [];
      for (let c = 0; c < this.COLUMNS; c++) {
        this.tiles[r][c] = model[r][c];
      }
    }
  }
}
