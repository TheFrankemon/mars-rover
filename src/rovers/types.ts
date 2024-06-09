export type Plateau = {
  readonly start: {
    x: 0,
    y: 0
  },
  end: {
    x: number | undefined,
    y: number | undefined
  }
}
export type RoverPosition = {
  x: number,
  y: number,
  dir: CardinalPointType
};
export type RoverCommands = MovingCommand | RotateCommand;
export type MovingCommand = 'M';
export type RotateCommand = 'L' | 'R';
export const CardinalPoint = ['N', 'E', 'S', 'W'] as const;
export type CardinalPointType = typeof CardinalPoint[number];
