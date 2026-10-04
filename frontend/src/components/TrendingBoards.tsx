import type { Board } from '../types'
import { useState } from 'react'
import './TrendingBoards.css'

type Props = { boards: Board[] }

type SortOrder = 'newest' | 'oldest' | 'popular'

export function TrendingBoards({ boards }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')

  return (
    <section className="trending">
      <div className="trending-header">
        <h2>話題の板</h2>
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="popular">人気順</option>
        </select>
      </div>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <h3>{board.name}</h3>
            <p>{board.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
