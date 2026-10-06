import { Hono } from 'hono'

export const boardsRoute = new Hono()

import { db } from '../db.js'

// 板の一覧
boardsRoute.get('/', (c) => {
  const boards = db.prepare('SELECT id, name, description FROM boards ORDER BY rowid').all()
  return c.json(boards)
})

// その板のスレッド一覧 (新しい書き込みがあった順)
boardsRoute.get('/:boardId/threads', (c) => {

  const boardId = c.req.param('boardId')

  const board = db.prepare('SELECT id FROM boards WHERE id = ?').get(boardId)
  if (!board) {
    return c.json({ error: '板が見つかりません' }, 404)
  }

  const threads = db
    .prepare('SELECT * FROM threads WHERE boardId = ? ORDER BY updatedAt DESC')
    .all(boardId)

  return c.json(threads)
})
