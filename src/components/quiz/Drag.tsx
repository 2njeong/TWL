'use client';

import { useState } from 'react';

const Drag = () => {
  const [{ x, y }, setPosition] = useState({
    x: 0,
    y: 0
  });
  //   console.log(x, y);

  return (
    <div className="w-full h-[200px]">
      Drag
      <div
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
          const mouseMoveHandler = (moveEvent: MouseEvent) => {
            // 2️⃣
            const deltaX = moveEvent.screenX - clickEvent.screenX;
            const deltaY = moveEvent.screenY - clickEvent.screenY;

            // 3️⃣
            setPosition({
              x: x + deltaX,
              y: y + deltaY
            });
          };

          const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
          };

          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler, { once: true });
        }}
      />
      Drag Item
    </div>
  );
};

export default Drag;
