import type { Board } from './types'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'

export function App() {
  const [boards, setBoards] = useState<Board[]>([])
  useEffect(() => {
    fetch('/api/boards')
      .then((res) => res.json())
      .then((data) => setBoards(data))
  }, [])
  return (
    <>
      <Header />
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <h2>{board.name}</h2>
            <p>{board.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
