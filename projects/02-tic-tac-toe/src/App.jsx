import { useState } from 'react'

const TURNS = {
  x: "X",
  o: "O"
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const winnerCombination = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
]


function App() {
  const [board, setBaord] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combination of winnerCombination) {
      const [a, b, c] = combination
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBaord(newBoard)
    const newturn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newturn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }else if (newBoard.every(square => square !== null)) {
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.x} >{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o} >{TURNS.o}</Square>
      </section>
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {winner === false ? 'No winner' : `The winner is ${winner}`}
              </h2>
              <footer>
                <button onClick={() => {
                  setBaord(Array(9).fill(null))
                  setTurn(TURNS.x)
                  setWinner(null)
                }}>
                  Restart
                </button>
              </footer>
            </div>

          </section>
        )
      }
    </main>
  )
}

export default App
