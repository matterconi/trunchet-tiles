import React, { useRef, useEffect } from 'react';
import Tile from '../SquareTile'; // SquareTile should implement logic for drawing squares
import p5 from 'p5';

interface SketchProps {
  canvasSize: number;
  tileSize: number;
  backgroundColor: string;
  tileColors: string[];
  onDownload: (callback: () => void) => void;
}

const SketchSquare: React.FC<SketchProps> = ({ canvasSize, tileSize, backgroundColor, tileColors, onDownload }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  
  useEffect(() => {
    const sketch = (p: p5) => {
      const tiles: Tile[][] = [];
      let cols: number;
      let rows: number;

      const colors = tileColors.map((color) => p.color(color));

      p.setup = () => {
        p.createCanvas(canvasSize, canvasSize).parent(sketchRef.current!);
        cols = Math.floor(p.width / tileSize);
        rows = Math.floor(p.height / tileSize);

        // Populate the tiles array
        for (let i = 0; i < cols; i++) {
          tiles[i] = [];
          for (let j = 0; j < rows; j++) {
            tiles[i][j] = new Tile(
              i * tileSize,
              j * tileSize,
              p.floor(p.random(4)), // Random type between 0 and 3
              tileSize,
              colors[p.floor(p.random(colors.length))],
              p
            );
          }
        }
      };

      p.draw = () => {
        p.background(p.color(backgroundColor));

        // Iterate over the tiles array and call display() on each tile
        for (let i = 0; i < tiles.length; i++) {
          for (let j = 0; j < tiles[i].length; j++) {
            tiles[i][j].display();
          }
        }
      };
    };

    const p5Instance = new p5(sketch);
    p5InstanceRef.current = p5Instance;

    return () => {
      p5Instance.remove();
    };
  }, [canvasSize, tileSize, backgroundColor, tileColors]); // Re-run effect when settings change

  useEffect(() => {
    onDownload(() => {
      if (sketchRef.current && p5InstanceRef.current) {
        p5InstanceRef.current.saveCanvas('my-sketch', 'png');
      }
    });
  }, [onDownload]); // Only set the onDownload function once
  
  return (
    <div>
      <div ref={sketchRef}></div>
    </div>
  );
};

export default SketchSquare;
