
import React from "react";
import ReactDOM from "react-dom";
import './app.css';

const Greeting = () => {
  return <h1>Hello Tic Tac Toe!</h1>;
};

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        // when square is clicked, onClick of Board is called (raise state)
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // lift square state to board
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
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
    const status = 'Next player: X';

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