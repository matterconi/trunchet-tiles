import { useState, useEffect, useCallback } from 'react';
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

  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
  
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
  
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);  

  return (
    <div className="w-screen h-screen-dynamic flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
      <h1 className="text-4xl text-gray-100 font-bold fixed top-[50px] min-h-[100px] h-[100px] max-h-[100px] flex items-center">
        Trunchet Tiles
      </h1>

      <div className="flex justify-center items-center w-screen relative top-[-50px]">
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
