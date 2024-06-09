export type RoverPosition = [number, number, CardinalPointType];
export type RoverCommands = MovingCommand | RotateCommand;
export type MovingCommand = 'M';
export type RotateCommand = 'L' | 'R';
export const CardinalPoint = ['N', 'E', 'S', 'W'] as const;
export type CardinalPointType = typeof CardinalPoint[number];
