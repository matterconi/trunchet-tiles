import React, { useState, useRef, useEffect } from 'react';
import p5 from 'p5';

interface KnobProps {
  radius?: number;
  valueName?: string;
  setSize: (size: number) => void;
  isCanva?: boolean;
}

const Knob: React.FC<KnobProps> = ({ radius = 50, valueName = 'Angle', setSize, isCanva }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0); // Start at 45°
  const [progressToDisplay, setProgressToDisplay] = useState(0); // React state for UI updates
  const activeEdge = useRef<number | null>(null); // Tracks which edge is active
  const latestAngles = useRef<number[]>([136, 136]); // Tracks the two most recent angle positions
  const isDragging = useRef(false); // To track if the dot is being dragged
  const momentumTimer = useRef<NodeJS.Timeout | null>(null); // Timer reference for momentum
  const progressRef = useRef(0);

  const screenWidth = window.innerWidth - 50; // Use innerWidth for the viewport width
  const screenHeight = window.innerHeight - 450; // Subtract fixed control height

  useEffect(() => {
    const sketch = (p: p5) => {
      let centerX: number;
      let centerY: number;

      p.setup = () => {
        p.createCanvas(radius * 2 + 35, radius * 2 + 35).parent(sketchRef.current!);
        centerX = p.width / 2;
        centerY = p.height / 2;
        p.fill(230);
      };

      const normalizeAngleToProgress = (angle: number): number => {
        const shiftedAngle = (angle - 45) < 0 ? (angle - 45 + 360) : (angle - 45);
        const progress = ((shiftedAngle - 90) / 270) * 100;
        if (isCanva) {
          setSize(Math.ceil(progress || 1) * 0.01 * Math.min(screenHeight, screenWidth));
          setProgressToDisplay(Math.ceil(Math.ceil(progress || 1) * 0.01 * Math.min(screenHeight, screenWidth)));
        } else {
          setSize(20 + Math.ceil(progress * 0.8));
          setProgressToDisplay(20 + Math.ceil(progress * 0.8));
        }        
        return Math.max(0, Math.min(100, progress)); // Clamp between 0% and 100%
      };

      p.draw = () => {
        p.clear();
        p.background(17, 24, 39);
      
        // Draw the knob background
        p.noFill();
        p.stroke(100);
        p.strokeWeight(4);
        p.ellipse(centerX, centerY, radius * 2, radius * 2);
      
        progressRef.current = normalizeAngleToProgress(angleRef.current);
      
        const startAngle = 135; // Starting bar position at 135°
        const endAngle = 45; // Visual range ends at 45°
        const numBars = 37; // Total number of bars
      
        // Draw the charging bars
        for (let i = 0; i < numBars; i++) {
          // Adjust bar angle to start at 135°
          const angleStep = ((endAngle - startAngle + 360) % 360) / numBars;
          const barAngle = p.radians(startAngle + angleStep * i);
      
          const barX1 = centerX + (radius + 5) * p.cos(barAngle); // Start of the bar
          const barY1 = centerY + (radius + 5) * p.sin(barAngle);
          const barX2 = centerX + (radius + 15) * p.cos(barAngle); // End of the bar
          const barY2 = centerY + (radius + 15) * p.sin(barAngle);
      
          // Determine if the bar is filled based on progress
          const filledBars = (progressRef.current / 100) * numBars;
          if (i < filledBars) {
            p.stroke(0, 250, 0); // Filled bars: green
          } else {
            p.stroke(230); // Empty bars: gray
          }
      
          p.strokeWeight(2);
          p.line(barX1, barY1, barX2, barY2);
        }
      
        // Calculate dot position
        const angleInRadians = p.radians(angleRef.current);
        const dotX = centerX + radius * p.cos(angleInRadians);
        const dotY = centerY + radius * p.sin(angleInRadians);
      
        // Draw the dot
        p.fill(255, 0, 0);
        p.noStroke();
        p.ellipse(dotX, dotY, 10, 10);
      };

      // Check if the mouse is near the dot
      const isMouseNearDot = (mouseX: number, mouseY: number) => {
        const angleInRadians = p.radians(angleRef.current);
        const dotX = centerX + radius * p.cos(angleInRadians);
        const dotY = centerY + radius * p.sin(angleInRadians);

        const distance = p.dist(mouseX, mouseY, dotX, dotY);

        if (distance <= 10) {
          isDragging.current = true;

          // Reset momentum timer
          if (momentumTimer.current) clearTimeout(momentumTimer.current);

          // Set timer to stop drag after 1s of inactivity
          momentumTimer.current = setTimeout(() => {
            isDragging.current = false;
          }, 700);

          return true;
        }

        return isDragging.current; // Maintain drag momentum
      };

      p.mouseDragged = () => {
        if (!isMouseNearDot(p.mouseX, p.mouseY)) return;

        const dx = p.mouseX - centerX;
        const dy = p.mouseY - centerY;

        // Ensure dx and dy are valid numbers
        if (Number.isNaN(dx) || Number.isNaN(dy)) return;

        const angle = (p.atan2(dy, dx) * 180) / p.PI;
        const currentAngle = (angle + 360) % 360;

        // Skip NaN values
        if (Number.isNaN(currentAngle)) {
          console.warn("Skipped invalid angle calculation");
          return;
        }

        // Update the two most recent angles
        latestAngles.current = [latestAngles.current[1], currentAngle];

        if (!activeEdge.current) {
          if (Math.floor(latestAngles.current[0]) <= 45 && Math.floor(latestAngles.current[1]) >= 45 && Math.ceil(latestAngles.current[1]) < 100 && Math.ceil(latestAngles.current[0]) < 100) {
            activeEdge.current = 45;
            return;
          }
          if (Math.floor(latestAngles.current[1]) <= 135 && Math.floor(latestAngles.current[0]) >= 135 && Math.ceil(latestAngles.current[1]) > 100 && Math.ceil(latestAngles.current[0]) > 100) {
            activeEdge.current = 135;
            return;
          }
        }

        // Reset edge if the current angle re-enters the dynamic range
        if (activeEdge.current === 45 && Math.ceil(latestAngles.current[1]) <= 45 && Math.ceil(latestAngles.current[0]) >= 45 && Math.ceil(latestAngles.current[1]) < 100 && Math.ceil(latestAngles.current[0]) < 100) {
          activeEdge.current = null;
        }

        if (activeEdge.current === 135 && Math.ceil(latestAngles.current[0]) <= 135 && Math.ceil(latestAngles.current[1]) >= 135 && Math.ceil(latestAngles.current[1]) > 100 && Math.ceil(latestAngles.current[0]) > 100) {
          activeEdge.current = null;
        }

        // Block movement beyond the active edge
        if (activeEdge.current) return;

        angleRef.current = currentAngle; // Update angle
      };

      p.mousePressed = () => {
        const dx = p.mouseX - centerX; // Relative x position
        const dy = p.mouseY - centerY; // Relative y position
        
        console.log(`Mouse Pressed: ${dx}, ${dy}`);
        // Check if the click is inside the circle
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= radius - 10 && distance <= radius + 10) {
          // Calculate the angle in degrees
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // atan2 expects relative coordinates
          const currentAngle = (angle + 360) % 360; // Normalize angle to 0-360 degrees
      
          // Shift the angle by -45 degrees for alignment
          const shiftedAngle = (currentAngle - 45 + 360) % 360;
      
          // Optional: Restrict to a specific range if needed
          if ( shiftedAngle >= 90) {
            angleRef.current = currentAngle;
            console.log(`Angle Set: ${currentAngle}`);
          } else {
            console.log(`Click ignored: ${currentAngle} out of range.`);
          }
        }
      };

      p.mouseReleased = () => {
        activeEdge.current = null; // Reset edge on release
        latestAngles.current = [136, 136]; // Reset latest angle history
      };
    };

    const p5Instance = new p5(sketch);

    return () => p5Instance.remove(); // Cleanup on unmount
  }, [radius, setSize, isCanva, screenHeight, screenWidth]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={sketchRef}></div>
      <div className="mt-2 text-center text-gray-100">
        {valueName}: {progressToDisplay} px
      </div>
    </div>
  );
};

export default Knob;
