
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
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');

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