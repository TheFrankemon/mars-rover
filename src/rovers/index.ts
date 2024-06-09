import * as readline from 'readline';
import { MarsRoversChallenge } from './mars-rovers';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input: string[] = [];

rl.write('Insert the commands for the rovers line by line. To finish and process the output, press ENTER on a empty line.\n');

rl.on('line', (line) => {
  if(line === '') {
    rl.close();
  } else {
    input.push(line);
  }
}).on('close', () => {
  const challenge = new MarsRoversChallenge(input);

  try {
    const result = challenge.run();
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  process.exit(0);
});
