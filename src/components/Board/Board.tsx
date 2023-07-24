import { Square } from '../Square/Square';
import './Board.css';

export type SquareValue = 'X' | 'O' | null;

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
}

export const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  const calculateWinner = (squares: Array<SquareValue>) => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);

  const status = winner
    ? 'Winner: ' + winner
    : 'Next texucraft: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="board-container">
      <div className="status">{status}</div>

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Square
              value={squares[i]}
              onSquareClick={() => handleClick(i)}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};
