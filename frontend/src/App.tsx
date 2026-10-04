import type { Board } from './types'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { TrendingBoards } from './components/TrendingBoards'
import { TrendingTags } from './components/TrendingTags'

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
      <TrendingBoards boards={boards} />
      <TrendingTags />
    </>
  )
}
