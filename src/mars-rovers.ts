import { Rover } from './rover';
import { CardinalPointType, Plateau } from './types';

export class MarsRoversChallenge {
  plateau: Plateau = {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: undefined,
      y: undefined
    }
  }
  rovers: Rover[] = [];
  input: string[];

  constructor(input: string[]) {
    if (input === undefined) {
      throw new Error('No instructions given.');
    } else if (input.length < 3 || input.some(arr => arr.length === 0)) {
      throw new Error('Not enough instructions.');
    }

    this.input = input;

    this.plateau.end = this.setPlateauLimits();
    this.rovers = this.setRovers();
  }

  run() {
    this.interpretCommands();

    return this.lastPositions;
  }

  private setPlateauLimits() {
    if (this.input[0].match(/^\d+ \d+$/) === null) {
      throw new Error('Plateau is not well formatted.');
    }

    const parsedLimits = this.input[0].split(' ').map(digit => +digit);
    this.input.shift(); // remove the used plateau instruction & leave only rover instructions on the array

    return {
      x: parsedLimits[0],
      y: parsedLimits[1]
    };
  }

  private setRovers() {
    const rovers: Rover[] = [];
    for (let i = 0; i < this.input.length; i += 2) {
      if (this.input[i].match(/^\d+ \d+ [NEWS]$/) === null) {
        throw new Error('Rover instructions are not well formatted.');
      }  

      const position = this.input[i].split(' ');

      rovers.push(new Rover(
        {
          x: +position[0],
          y: +position[1],
          dir: position[2] as CardinalPointType
        },
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
    return this.rovers.map(rov => `${rov.finalPos.x} ${rov.finalPos.y} ${rov.finalPos.dir}`).join('\n');
  }

  private checkDrop(rov: Rover, rovId: number) {
    if (rov.currentPos.x < 0 || rov.currentPos.x > this.plateau.end.x! || rov.currentPos.y < 0 || rov.currentPos.y > this.plateau.end.y!) {
      throw new Error(`ROVER #${rovId+1} FELL FROM THE PLATEAU`);
    }
  }
}
