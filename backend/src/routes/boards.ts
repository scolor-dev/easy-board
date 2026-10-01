import { Hono } from 'hono'

export const boardsRoute = new Hono()

import { db } from '../db.js'

// 板の一覧
boardsRoute.get('/', (c) => {
  const boards = db.prepare('SELECT id, name, description FROM boards ORDER BY rowid').all()
  return c.json(boards)
})
