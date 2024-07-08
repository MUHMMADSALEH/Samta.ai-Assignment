import { useEffect, useState } from "react";
import "./App.css";


export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("Next player is X");
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const savedScore = localStorage.getItem("ticTacToeScore");
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticTacToeScore", JSON.stringify(score));
  }, [score]);

  const handleClick = (index) => {
    const currentSquares = [...squares];
    if (getWinner(currentSquares) || currentSquares[index]) return;

    currentSquares[index] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(currentSquares);
  };

  const Square = ({ value, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`square ${value === "X" ? "blue" : "red"}`}
      >
        {value}
      </button>
    );
  };

  const handleRestart = () => {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
    setStatus("Next player is X");
  };

  const getWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = getWinner(squares);
    if (winner) {
      setStatus(`Winner is ${winner}. Please restart the game`);
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    } else if (squares.every((square) => square !== "")) {
      setStatus("This is a draw! Please restart the game");
    } else {
      setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);

  return (
    <div className="tic-tac-toe-container">
      <div className="scoreboard">
        <span className="score blue">Player X (Blue): {score.X}</span>
        <span className="score red">Player O (Red): {score.O}</span>
      </div>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      <h1>{status}</h1>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}
