import * as React from 'react';
import './App.css';
import { useLocalStorageState } from './utils';

type SquaresData = any[]
type BoardType = {
  squares: SquaresData, 
  onClick: (i: number) => void
}
function Board({squares, onClick}: BoardType) {
  function renderSquare(i: number) {
    return (
      <button className='board-square' onClick={() => onClick(i)}>
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
  const [squares, setSquares] = useLocalStorageState('tic-tac-toe:squares', Array(9).fill(null))

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square: number) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  return (
    <div>
      <div>
        {status}
      </div>
      <div className='game'>
        <Board squares={squares} onClick={selectSquare} />
      </div>
      <div>
        <button onClick={restart}>Restart</button>
      </div>
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

function calculateNextValue(squares: SquaresData) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : '0'
}

function calculateWinner(squares: SquaresData) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

type WinnerData = string | null
function calculateStatus(winner: WinnerData, squares: SquaresData, nextValue: string) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

export default App;
