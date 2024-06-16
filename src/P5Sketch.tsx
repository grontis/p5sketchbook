import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Sketch: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sketch: p5 | null = null;

    if (sketchRef.current) {
      sketch = new p5((p: p5) => {
        let r: number, g: number, b: number;
        let shapeWidth: number, shapeHeight: number;

        p.setup = () => {
          p.noCursor();
          p.createCanvas(p.windowWidth, p.windowHeight);
          r = p.random(255);
          g = p.random(255);
          b = p.random(255);
          shapeWidth = 80;
          shapeHeight = 80;
        };

        p.draw = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          p.background(255);
          p.strokeWeight(2);
          p.stroke(r, g, b);
          p.ellipse(p.mouseX, p.mouseY, shapeWidth, shapeHeight).fill(r, g, b, 255);
          p.text(`${p.hour()}:${p.minute()}:${p.second()}:${p.millis()}`, 500, 500).textSize(45);
        };

        p.mousePressed = () => {
          r = p.random(255);
          g = p.random(255);
          b = p.random(255);
        };

        p.mouseMoved = () => {
          // Add your mouseMoved logic here
        };
      }, sketchRef.current);
    }

    return () => {
      sketch?.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default Sketch;