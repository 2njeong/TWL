import { EventHandlers } from '@/type/quizType';
import { MutableRefObject, useEffect } from 'react';

export const useUnifiedHandler = ({
  ref,
  handlers
}: {
  ref: MutableRefObject<HTMLElement | null>;
  handlers: EventHandlers;
}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { handleStart, handleMove } = handlers;

    const eventHandlers = [
      { type: 'mousedown', handler: handleStart },
      { type: 'mousemove', handler: handleMove },
      // { type: 'mouseup', handler: handleEnd },
      { type: 'touchstart', handler: handleStart },
      { type: 'touchmove', handler: handleMove }
      // { type: 'touchend', handler: handleEnd }
    ];

    eventHandlers.forEach(({ type, handler }) => {
      element.addEventListener(type as keyof HTMLElementEventMap, handler as any);
    });

    return () => {
      eventHandlers.forEach(({ type, handler }) => {
        element.removeEventListener(type as keyof HTMLElementEventMap, handler as any);
      });
    };
  }, [ref, handlers]);
};
