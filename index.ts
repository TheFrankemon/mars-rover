import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Hey! ? [y/n] ', (answer) => {
  switch(answer.toLowerCase()) {
  case 'y':
    console.log('Super!');
    break;
  case 'n':
    console.log('Sorry! :(');
    break;
  default:
    console.log('Invalid answer!');
  }

  rl.close();
});
