import React, { useCallback, useState } from 'react';
import './App.css';
import { MarsRoversChallenge } from './rovers/mars-rovers';

const App = () => {
  const [input, setInput] = useState<string>();
  const [result, setResult] = useState<string>();
  const [error, setError] = useState<string>();
  const [instructions] = useState<string>('The first line of input is the upper-right coordinates of the plateau, the lower-left ' +
    'coordinates are assumed to be 0,0.\n\nThe rest of the input is information pertaining to the rovers that have been deployed.' +
    'Each rover has two lines of input. The first line gives the rover\'s position, and the second line is a series of instructions ' +
    'telling the rover how to explore the plateau.\n\nThe position is made up of two integers and a letter separated by spaces, ' +
    'corresponding to the x and y coordinates and the rover\'s orientation.'
  );

  const clean = useCallback(() => {
    setResult(undefined);
    setError(undefined);
  }, [])

  const run = useCallback(() => {
    clean();

    try {
      const parsedInput = input?.split('\n');
      const challenge = new MarsRoversChallenge(parsedInput!);

      setResult(challenge.run());
    } catch (error: any) {
      setError(error.message);
    }
  }, [input, clean]);


  const onInputChange = useCallback((val: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(val.target.value);
  }, [])

  return (
    <div className="App">
      <header>
        <h1>Mars Rovers @React</h1>
        <p>{instructions}</p>
      </header>
      <article>
        <section className="input-section">
          <label>INPUT</label>
          <textarea
            className="rovers-textarea input-mode"
            value={input}
            onChange={onInputChange}
            placeholder='Give instructions. ex.
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM'
          ></textarea>
          <button className="action-button" type="button" onClick={run}>Run ➡</button>
        </section>
        <section className="input-section">
          <label>OUTPUT</label>
          <textarea
            className={'rovers-textarea output-mode' + (error ? ' error' : '')}
            readOnly
            placeholder='...'
            value={error ? error : result}
          ></textarea>
        </section>

      </article>
      <footer>
        by <a href='https://thefrankemon.dev' target='blank'>TheFrankemon</a>
      </footer>
    </div>
  );
}

export default App;
