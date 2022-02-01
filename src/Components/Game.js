import {useState} from "react";
import Board from "./Board";

function Game() {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(newHistory.concat([{
            squares: squares,
        }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    function renderHistory() {
        return (
            history.map((step, move) => {
                const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>{desc}</button>
                    </li>
                );
            })
        );
    }

    /* Handle onClick for buttons used to navigate the game's history. */
    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{renderHistory()}</ol>
            </div>
        </div>
    );

}


function calculateWinner(squares) {
    const lines = [
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;