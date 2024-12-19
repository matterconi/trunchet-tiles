import { useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import './App.css';
import SketchSquare from './components/SketchSquare';
import SketchCircle from './components/SketchCircles';
import Controls from './components/Controls';
import MobileControls from './components/MobileControls';

function App() {
  const [canvasSize, setCanvasSize] = useState(1);
  const [tileSize, setTileSize] = useState(1);
  const [downloadCallback, setDownloadCallback] = useState<() => void>(() => {});

  const backgroundColor = '#f9f9f9';
  const tileColors = ['#fff001', '#ff0101', '#0101fd', 'green'];
  const [isCircles, setIsCircles] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  const handleDownloadCallback = useCallback((callback: () => void) => {
    setDownloadCallback(() => callback); // Avoids setting a new function reference on every render
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl text-gray-100 font-bold absolute top-0 min-h-[100px] max-h-[100px] h-full flex items-center">
        Trunchet Tiles
      </h1>

      <div className="flex justify-center items-center h-[calc(100vh-350px)] fixed top-[100px] w-screen">
        {isCircles ? (
          <SketchCircle
            canvasSize={canvasSize}
            tileSize={tileSize}
            backgroundColor={backgroundColor}
            tileColors={tileColors}
            onDownload={handleDownloadCallback}
          />
        ) : (
          <SketchSquare
            canvasSize={canvasSize}
            tileSize={tileSize}
            backgroundColor={backgroundColor}
            tileColors={tileColors}
            onDownload={handleDownloadCallback}
          />
        )}
      </div>

      {isMobile ? (
        <MobileControls
          setCanvasSize={setCanvasSize}
          setTileSize={setTileSize}
          downloadSketch={downloadCallback}
          isCircles={isCircles}
          setIsCircles={setIsCircles}
        />
      ) : (
        <Controls
          setCanvasSize={setCanvasSize}
          setTileSize={setTileSize}
          downloadSketch={downloadCallback}
          isCircles={isCircles}
          setIsCircles={setIsCircles}
        />
      )}
    </div>
  );
}

export default App;
