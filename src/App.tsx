import * as React from 'react';
import './App.css';

type BoardType = {
  squares: any[], 
  selectSquare: (step: number) => void
}
function Board({squares, selectSquare}: BoardType) {
  function renderSquare(i: number) {
    return (
      <button className='board-square' onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }
  return (
    <div className='board'>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  return (
    <div>
      a
      <Board squares={[]} selectSquare={(step) => console.log(step)} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
