import type { Board } from './types'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { TrendingBoards } from './components/TrendingBoards'
import { TrendingTags } from './components/TrendingTags'
import { ThreadList } from './components/ThreadList'

export function App() {
  const [boards, setBoards] = useState<Board[]>([])
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  useEffect(() => {
    fetch('/api/boards')
      .then((res) => res.json())
      .then((data) => setBoards(data))
  }, [])
  return (
    <>
      <Header />
        {selectedBoard === null ? (
          <>
            <TrendingBoards onSelect={setSelectedBoard} boards={boards} />
            <TrendingTags />
          </>
        ) : (
          <ThreadList board={selectedBoard} onBack={() => setSelectedBoard(null)} />
        )}
      </>
  )
}

