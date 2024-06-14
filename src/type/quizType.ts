export type EventHandlers = {
  handleStart: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>, idx: number) => void;
  handleMove: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
  handleEnd: (event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
};
