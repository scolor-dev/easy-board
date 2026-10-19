import type { Board, Thread } from './types'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { TrendingBoards } from './components/TrendingBoards'
import { TrendingTags } from './components/TrendingTags'
import { ThreadList } from './components/ThreadList'
import { ThreadDetail } from './components/ThreadDetail'

export function App() {
  const [boards, setBoards] = useState<Board[]>([])
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)

  useEffect(() => {
    fetch('/api/boards')
      .then((res) => res.json())
      .then((data) => setBoards(data))
  }, [])

  let content
  if (selectedBoard === null) {
    content = (
      <>
        <TrendingBoards onSelect={setSelectedBoard} boards={boards} />
        <TrendingTags />
      </>
    )
  } else if (selectedThread === null) {
    content = (
      <ThreadList
        board={selectedBoard}
        onBack={() => {
          setSelectedBoard(null)
          setSelectedThread(null)
        }}
        onSelect={(thread) => setSelectedThread(thread)}
      />
    )
  } else {
    content = (
      <ThreadDetail
        thread={selectedThread}
        onBack={() => setSelectedThread(null)}
      />
    )
  }

  return (
    <>
      <Header />
        {content}
    </>
  )
}

