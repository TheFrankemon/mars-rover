import { RoverPosition, RoverCommands, RotateCommand, CardinalPoint } from './types';

export class Rover {
  initialPos: RoverPosition;
  currentPos: RoverPosition;
  commands: RoverCommands[];

  constructor(initialPos: RoverPosition, commands: string) {
    this.initialPos = initialPos;
    this.currentPos = initialPos;
    this.commands = [...commands] as RoverCommands[];
  }

  move() {
    const currentDir = this.currentPos[2];

    if (currentDir === 'N') {
      this.currentPos[1] += 1;
    } else if (currentDir === 'E') {
      this.currentPos[0] += 1;
    } else if (currentDir === 'S') {
      this.currentPos[1] -= 1;
    } else if (currentDir === 'W') {
      this.currentPos[0] -= 1;
    }
  }

  rotate(cmd: RotateCommand) {
    const currentDir = this.currentPos[2];

    this.currentPos[2] = cmd === 'L'
      ? (CardinalPoint.indexOf(currentDir) === 0 ? CardinalPoint[CardinalPoint.length - 1] : CardinalPoint[CardinalPoint.indexOf(currentDir) - 1])
      : (CardinalPoint.indexOf(currentDir) === CardinalPoint.length - 1 ? CardinalPoint[0] : CardinalPoint[CardinalPoint.indexOf(currentDir) + 1]);
  }

  get finalPos() {
    return this.currentPos;
  }
}
