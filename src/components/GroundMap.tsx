import React, { useRef } from 'react';
import { Point } from '../types';
import { LinearProgress } from '@material-ui/core';

function drawLine({ ctx, val, index, arrayLength }) {
  const isFirst = index === 0;
  const isLast = index === arrayLength -1;

  const { x, y } = val;
  
  if (isFirst) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
    
  if (isLast) {
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}

function drawSlot({ ctx, slotIsTaken, slotPoints }) {
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 4;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

  ctx.strokeStyle = slotIsTaken ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)';
  ctx.fillStyle = slotIsTaken ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)';
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';

  slotPoints.forEach((val, index) => 
    drawLine({ ctx, val, index, arrayLength: slotPoints.length }
  ));
}

function drawImage({ canvas, ctx, image }) {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
}

function drawMap({ imageUrl, canvas, slots, coordinatesOfSlots }) {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      drawImage({ canvas, ctx, image });
      for (const slot of slots) {
        const { slotNumber, slotStatus } = slot;
        const slotPoints = coordinatesOfSlots.get(slotNumber.toUpperCase());
        const slotIsTaken = Boolean(slotStatus);
        slotPoints && drawSlot({ ctx, slotIsTaken, slotPoints });
      }
    };
  }
}

function GroundMap({ slots, loading, imageUrl, coordinatesOfSlots }: {
  slots: any[] | null, loading: boolean, imageUrl: string, coordinatesOfSlots: Map<string, Point[]>
}) {
  const canvasRef = useRef(null);
  const canvas: any = canvasRef.current;
  drawMap({ imageUrl, canvas, slots, coordinatesOfSlots });

  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
      { loading && <LinearProgress />}
    </React.Fragment>
  );
}

export default GroundMap;
