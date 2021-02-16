
import React from "react";
import ReactDOM from "react-dom";
import style from './app.css';

const Greeting = () => {
  return  <h1>Hello Tic Tac Toe!</h1>;
}

function Square(props) {
  return (
    <button
      className={style.square}
      // when square is clicked, onClick of board is called (raise state)
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  handleClick(i) {
    // slice creates a copy of squares array
    const squares = this.state.squares.slice();
    // check if winner or checked end early
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      // toggle the xIsNext when a square is clicked
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
            // passing two props from board to square
            <Square
              value={this.props.squares[i]}
              // onclick event handler expecting square / button click
              onClick={() => this.props.onClick(i)}
            />
    );
  }

  render() {
    return (
      <div>
        <div className={style.status}>{status}</div>
        <div className={style.boardRow}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={style.boardRow}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={style.boardRow}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0, // initialize to 0
      xIsNext: true
    };
  }

  handleClick(i) {
    // there can be only one history
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length, //
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; // whenver is now
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className={style.game}>
        <div className={style.gameBoard}>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className={style.gameInfo}>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// helper function to declare winner
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
    // if a is and a is equal to b and a is equal to c then b is equal to c (transitive property)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return the square a which contains winner
      return squares[a];
    }
  }
  return null;
}