import type { Board } from './types'
import { useState, useEffect } from 'react'

export function App() {
  const [boards, setBoards] = useState<Board[]>([])
  useEffect(() => {
    fetch('/api/boards')
      .then((res) => res.json())
      .then((data) => setBoards(data))
  }, [])
  return (
    <>
      <h1>0ちゃんねる</h1>
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
