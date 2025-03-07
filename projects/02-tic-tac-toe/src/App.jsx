import { useState } from 'react'
import { Square } from './component/Square';
import confetti from 'canvas-confetti';
import { TURNS, winnerCombination } from './constants';

function App() {
  const [board, setBaord] = useState(() => {
    const localBoard = window.localStorage.getItem('board');
    return localBoard ? JSON.parse(localBoard) : Array(9).fill(null)
  })
  const [turn, setTurn] =  useState(() => {
    const turnFromstorage = window.localStorage.getItem("turn");
    return turnFromstorage ?? TURNS.x
  })  //useState(TURNS.x);
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

  const cleanBoard = () => {
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBaord(newBoard)
    const newturn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newturn)

    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newturn);

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      cleanBoard()
    } else if (newBoard.every(square => square !== null)) {
      setWinner(false)
      cleanBoard()
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
