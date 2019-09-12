import React, { useRef } from 'react';
import { Parking, Point } from '../types';
import { Typography, LinearProgress } from '@material-ui/core';

const CoordinatesOfSlots = new Map<string, Point[]>([
  ['A10', [{ x: 24, y: 508 }, { x: 90, y: 478 }, { x: 213, y: 535 }, { x: 154, y: 567 }]],
  ['A11', [{ x: 109, y: 477 }, { x: 168, y: 450 }, { x: 283, y: 493 }, { x: 227, y: 525 }]],
  ['A12', [{ x: 184, y: 442 }, { x: 226, y: 418 }, { x: 337, y: 459 }, { x: 294, y: 486 }]],
  ['A13', [{ x: 242, y: 412 }, { x: 281, y: 391 }, { x: 394, y: 429 }, { x: 354, y: 454 }]],
  ['A14', [{ x: 303, y: 385 }, { x: 334, y: 365 }, { x: 444, y: 401 }, { x: 406, y: 422 }]],
  ['A55', [{ x: 350, y: 360 }, { x: 381, y: 341 }, { x: 486, y: 374 }, { x: 454, y: 393 }]],
  ['A56', [{ x: 395, y: 336 }, { x: 424, y: 321 }, { x: 530, y: 352 }, { x: 500, y: 369 }]],
  ['A57', [{ x: 439, y: 316 }, { x: 464, y: 301 }, { x: 568, y: 330 }, { x: 541, y: 346 }]],
  ['A58', [{ x: 482, y: 297 }, { x: 502, y: 285 }, { x: 599, y: 310 }, { x: 579, y: 324 }]],
  ['A59', [{ x: 520, y: 278 }, { x: 538, y: 267 }, { x: 632, y: 292 }, { x: 611, y: 302 }]],
  ['A60', [{ x: 553, y: 262 }, { x: 572, y: 253 }, { x: 663, y: 275 }, { x: 645, y: 285 }]],
  ['A61', [{ x: 139, y: 588 }, { x: 203, y: 552 }, { x: 340, y: 607 }, { x: 208, y: 617 }]],
  ['A62', [{ x: 214, y: 545 }, { x: 272, y: 512 }, { x: 390, y: 556 }, { x: 340, y: 595 }]],
  ['A63', [{ x: 284, y: 504 }, { x: 332, y: 477 }, { x: 446, y: 514 }, { x: 411, y: 549 }]],
  ['A64', [{ x: 346, y: 469 }, { x: 389, y: 444 }, { x: 499, y: 479 }, { x: 464, y: 507 }]],
  ['A65', [{ x: 402, y: 437 }, { x: 440, y: 416 }, { x: 543, y: 445 }, { x: 519, y: 470 }]],
  ['A66', [{ x: 453, y: 409 }, { x: 488, y: 389 }, { x: 588, y: 416 }, { x: 564, y: 438 }]],
  ['A67', [{ x: 499, y: 380 }, { x: 530, y: 364 }, { x: 629, y: 390 }, { x: 608, y: 406 }]],
  ['A68', [{ x: 7, y: 576 }, { x: 71, y: 613 }, { x: 138, y: 574 }, { x: 16, y: 518 }]],
  ['A69', [{ x: 784, y: 499 }, { x: 885, y: 440 }, { x: 954, y: 468 }, { x: 858, y: 532 }]],
  ['A70', [{ x: 538, y: 357 }, { x: 569, y: 340 }, { x: 665, y: 363 }, { x: 643, y: 383 }]],
  ['A71', [{ x: 580, y: 335 }, { x: 603, y: 321 }, { x: 695, y: 341 }, { x: 680, y: 357 }]],
  ['A72', [{ x: 616, y: 314 }, { x: 637, y: 303 }, { x: 722, y: 321 }, { x: 711, y: 334 }]],
  ['A73', [{ x: 648, y: 295 }, { x: 666, y: 285 }, { x: 751, y: 303 }, { x: 742, y: 315 }]],
  ['A74', [{ x: 89, y: 618 }, { x: 127, y: 596 }, { x: 172, y: 618 }, { x: 98, y: 617 }]],
  ['A75', [{ x: 894, y: 435 }, { x: 965, y: 461 }, { x: 996, y: 439 }, { x: 976, y: 390 }]]
]);

function drawSlot({ ctx, slotIsTaken, slotPoints }) {
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 4;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

  ctx.strokeStyle = slotIsTaken ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)';
  ctx.fillStyle = slotIsTaken ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)';
  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';

  slotPoints.forEach((val, index) => {
    const isFirst = index === 0;
    const isLast = index === slotPoints.length -1;

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
  });
}

function drawImage({ canvas, ctx, image }) {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
}

function drawMap({ imageUrl, canvas, items }) {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      drawImage({ canvas, ctx, image });
      for (const slot of items) {
        const { parkingID, slotNumber, slotStatus, device } = slot;
        const slotPoints = CoordinatesOfSlots.get(slotNumber.toUpperCase());
        const slotIsTaken = Boolean(slotStatus);
        slotPoints && drawSlot({ ctx, slotIsTaken, slotPoints });
      }
    };
  }
}

function GroundMap({ items, loading, imageUrl }: {
  items: any[] | null, loading: boolean, imageUrl: string
}) {
  const canvasRef = useRef(null);
  const canvas: any = canvasRef.current;
  drawMap({ imageUrl, canvas, items });

  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
      { loading && <LinearProgress />}
    </React.Fragment>
  );
}

export default GroundMap;
