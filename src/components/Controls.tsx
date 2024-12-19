import React from 'react';
import Knob from './Knob';

interface ControlsProps {
  setCanvasSize: (size: number) => void;
  setTileSize: (size: number) => void;
  isCircles: boolean;
  setIsCircles: (isCircles: boolean) => void;
  downloadSketch: () => void; // Trigger the download
}

const Controls: React.FC<ControlsProps> = ({
  setCanvasSize,
  setTileSize,
  isCircles,
  setIsCircles,
  downloadSketch,
}) => {
  const toggleShapes = () => {
    setIsCircles(!isCircles);
  };

  return (
    <div className="w-screen max-w-screen md:flex flex-col space-y-4 bg-gray-900 min-h-[250px] h-full max-h-[250px] fixed bottom-0 max-md:hidden">
      <div className="h-full flex items-center justify-around">
        {/* Canvas Size Knob */}
        <div>
          <label className="block mb-2 text-gray-100 text-center font-bold">
            Canvas Size
          </label>
          <Knob setSize={setCanvasSize} isCanva={true} valueName="Canvas Size" />
        </div>

        {/* Tile Size Knob */}
        <div>
          <label className="block mb-2 font-bold text-gray-100 text-center">
            Tile Size
          </label>
          <Knob setSize={setTileSize} valueName="Tile Size" />
        </div>

        {/* Toggle Shapes Switch */}
        <div className="flex flex-col items-center justify-center space-y-8 h-full">
          <div>
            <label className="block mb-2 font-bold text-gray-100 text-center">
              Toggle Shapes
            </label>
            <div
              onClick={toggleShapes}
              className={`relative w-14 h-8 rounded-full cursor-pointer transition ${
                isCircles ? 'bg-blue-500' : 'bg-green-500'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                  isCircles ? 'translate-x-0' : 'translate-x-6'
                }`}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-1">
              {isCircles ? 'Circles' : 'Squares'}
            </p>
          </div>
          {/* Download Button */}
          <div>
            <button
              onClick={downloadSketch}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md shadow-md"
            >
              Download Sketch
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Controls;
