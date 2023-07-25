import { useState } from 'react';
import { Board, SquareValue } from '../Board/Board';

import './Game.css';

export const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: SquareValue[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    console.log(history);
    console.log(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  };

  const Moves = () => {
    const jumpTo = (nextMove: number) => {
      setCurrentMove(nextMove);
      setXIsNext(nextMove % 2 === 0);
      setHistory([...history.slice(0, nextMove + 1)]);
    };

    return (
      <ol className="moves-container">
        {history.map((_: SquareValue[], move: number) => {
          let description;
          if (move > 0) {
            description = `Go to move #${move}`;
          } else {
            description = 'Go to game start';
          }

          return (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <div className="game-container">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

      <Moves />
    </div>
  );
};
