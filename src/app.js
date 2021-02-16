
import React from "react";
import ReactDOM from "react-dom";
import './app.css';

const Greeting = () => {
  return <h1>Hello Tic Tac Toe!</h1>;
};

function Square(props) {
  return (
    <button
      className="square"
      // when square is clicked, onClick of board is called (raise state)
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // lift square state to board
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // boolean initialized here?
      xIsNext: true,
    };
  }

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
              value={this.state.squares[i]}
              // onclick event handler expecting square / button click
              onClick={() => this.handleClick(i)}
            />
    );
  }

  render() {
    // do we have a winner?!
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Greeting />
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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