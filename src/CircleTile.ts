import p5 from 'p5';

class Tile {
  constructor(
    public x: number,
    public y: number,
    public type: number,
    public size: number,
    public color: p5.Color,
    private p: p5
  ) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = size;
    this.color = color;
    this.p = p;
  }

  display() {
    const p = this.p;
    const size = this.size;

    p.push();
    p.translate(this.x, this.y);

    p.noFill();
    p.stroke(this.color);
    p.strokeWeight(5); // Set stroke thickness

    switch (this.type) {
      case 0:
        // Shape 1: Two semicircles (bottom-right and top-left)
        p.arc(0, 0, size, size, 0, 90); // Bottom-right
        p.arc(size, size, size, size, 180, 270); // Top-left
        break;

      case 1:
        // Shape 2: Two semicircles (top-right and bottom-left)
        p.arc(size, 0, size, size, 90, 180); // Top-right
        p.arc(0, size, size, size, 270, 360); // Bottom-left
        break;

      default:
        console.error(`Unknown tile type: ${this.type}`);
        break;
    }
    p.pop();
  }
}

export default Tile;
