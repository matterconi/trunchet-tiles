import p5 from 'p5';

class Tile {
    constructor(public x: number, public y: number, public type: number, public size: number, public color: p5.Color, private p: p5) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = size;
        this.p = p;
        this.color = color;
    }

    display() {
        const p = this.p;
        const size = this.size;

        
        p.fill(this.color);
        p.noStroke();
        p.beginShape();

        switch (this.type) {
            case 0:
                // Shape 1: Bottom-right triangle
                p.vertex(this.x + size, this.y); // Top-right
                p.vertex(this.x + size, this.y + size); // Bottom-right
                p.vertex(this.x, this.y + size); // Bottom-left
                break;

            case 1:
                // Shape 2: Bottom-left triangle
                p.vertex(this.x, this.y); // Top-left
                p.vertex(this.x + size, this.y); // Top-right
                p.vertex(this.x, this.y + size); // Bottom-left
                break;

                case 2:
                    // Shape 3: Top-left triangle
                    p.vertex(this.x, this.y); // Top-left
                    p.vertex(this.x + size, this.y + size); // Bottom-right
                    p.vertex(this.x, this.y + size); // Bottom-left
                    break;
    
                case 3:
                    // Shape 4: Top-right triangle
                    p.vertex(this.x, this.y); // Top-left
                    p.vertex(this.x + size, this.y + size); // Bottom-right
                    p.vertex(this.x + size, this.y); // Top-right
                    break;
    
                default:
                    console.error(`Unknown tile type: ${this.type}`);
                    break;
            }
    
            p.endShape();
        }
    }
    
    export default Tile;
    
