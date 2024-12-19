import { useState } from 'react';
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
  const [activeControl, setActiveControl] = useState<'canvas' | 'tile' | 'toggle'>('canvas');

  const toggleShapes = () => {
    setIsCircles(!isCircles);
  };

  return (
    <div className="w-screen max-w-screen flex-col space-y-4 min-h-[250px] h-full max-h-[250px] fixed bottom-0 sm:hidden rounded-b-md">

      {/* Control Panel Above the Menu */}
      <div className="flex flex-col items-center justify-around py-4 h-full">

          <div className={`${activeControl === 'canvas' ? 'block' : 'hidden'}`}>
            <label className="block mb-2 text-gray-100 text-center font-bold">Canvas Size</label>
            <Knob setSize={setCanvasSize} isCanva={true} valueName="Canvas Size" />
          </div>

        
          <div className={`${activeControl === 'tile' ? 'block' : 'hidden'}`}>
            <label className="block mb-2 font-bold text-gray-100 text-center">Tile Size</label>
            <Knob setSize={setTileSize} valueName="Tile Size" />
          </div>

          <div className={`${activeControl === 'toggle' ? 'flex justify-around items-center h-full w-full' : 'hidden'}`}>
            {/* Toggle Shapes */}
              <div>
                <label className="block mb-2 font-bold text-gray-100 text-center">Toggle Shapes</label>
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
                      >

                    </div>
                  </div>
                <p className="text-sm text-gray-300 mt-1">{isCircles ? 'Circles' : 'Squares'}</p>
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
            {/* Tab Menu at the Bottom */}
            <div className="flex justify-around bg-blue-300 text-gray-100 py-2 fixed bottom-0 w-screen rounded-b-md">
        <button
          onClick={() => setActiveControl('canvas')}
          className={`px-4 py-2 rounded-md ${
            activeControl === 'canvas' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
          }`}
        >
          Canvas
        </button>
        <button
          onClick={() => setActiveControl('tile')}
          className={`px-4 py-2 rounded-md ${
            activeControl === 'tile' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
          }`}
        >
          Tiles
        </button>
        <button
          onClick={() => setActiveControl('toggle')}
          className={`px-4 py-2 rounded-md ${
            activeControl === 'toggle' ? 'bg-blue-600 text-white' : 'hover:bg-navy-700'
          }`}
        >
          Toggle & Download
        </button>
      </div>
    </div>
  );
};

export default Controls;
