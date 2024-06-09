import { Rover } from './rover';
import { CardinalPointType } from './types';

export class MarsRoversChallenge {
  plateau: number[][] = [[0, 0]];
  rovers: Rover[] = [];
  input: string[];

  constructor(input: string[]) {
    this.input = input;

    this.plateau.push(this.setPlateau());
    this.rovers = this.setRovers();
  }

  run() {
    this.interpretCommands();

    return this.lastPositions;
  }

  private setPlateau() {
    const parsedPlateau = this.input[0].split(' ').map(digit => +digit);
    this.input.shift(); // remove the used plateau instruction & leave only rover instructions on the array

    return parsedPlateau;
  }

  private setRovers() {
    const rovers: Rover[] = [];
    for (let i = 0; i < this.input.length; i += 2) {
      const position = this.input[i].split(' ');

      rovers.push(new Rover(
        [+position[0], +position[1], position[2] as CardinalPointType],
        this.input[i+1]
      ));
    }

    return rovers;
  }

  private interpretCommands() {
    this.rovers.forEach((rov, idx) => {
      rov.commands.forEach(cmd => {
        if (cmd === 'L' || cmd === 'R') {
          rov.rotate(cmd);
        } else if (cmd === 'M') {
          rov.move();
          this.checkDrop(rov, idx);
        } else {
          throw new Error('Command not recognized. Must be L R or M');
        }
      })
    });
  }

  private get lastPositions() {
    return this.rovers.map(rov => rov.finalPos.join(' ')).join('\n');
  }

  private checkDrop(rov: Rover, rovId: number) {
    const maxPos = [this.plateau[1][0], this.plateau[1][1]];
    if (rov.currentPos[0] < 0 || rov.currentPos[0] > maxPos[0] || rov.currentPos[1] < 0 || rov.currentPos[1] > maxPos[1]) {
      throw new Error(`ROVER #${rovId+1} FELL FROM THE PLATEAU`);
    }
  }
}
