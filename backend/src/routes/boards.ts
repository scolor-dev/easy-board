import { Hono } from 'hono'

export const boardsRoute = new Hono()

import { db } from '../db.js'

boardsRoute.get('/', (c) => {
  const boards = db.prepare('SELECT id, name, description FROM boards ORDER BY rowid').all()
  return c.json(boards)
})

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

const DEFAULT_NAME = '名無しさん'

boardsRoute.post('/:boardId/threads', async (c) => {
  const boardId = c.req.param('boardId')

  const board = db.prepare('SELECT id FROM boards WHERE id = ?').get(boardId)
  if (!board) {
    return c.json({ error: '板が見つかりません' }, 404)
  }

  const input = await c.req.json().catch(() => null)
  const title = typeof input?.title === 'string' ? input.title.trim() : ''
  const name = typeof input?.name === 'string' ? input.name.trim() : ''
  const body = typeof input?.body === 'string' ? input.body.trim() : ''

  if (title.length < 1 || title.length > 100) {
    return c.json({ error: 'titleは1〜100文字で入力してください' }, 400)
  }
  if (name.length > 20) {
    return c.json({ error: 'nameは20文字以内で入力してください' }, 400)
  }
  if (body.length < 1 || body.length > 1000) {
    return c.json({ error: 'bodyは1〜1000文字で入力してください' }, 400)
  }

  const now = new Date().toISOString()

  db.exec('BEGIN')
  try {
    const result = db
      .prepare('INSERT INTO threads (boardId, title, postCount, createdAt, updatedAt) VALUES (?, ?, 1, ?, ?)')
      .run(boardId, title, now, now)
    const threadId = Number(result.lastInsertRowid)

    db.prepare('INSERT INTO posts (threadId, number, name, body, createdAt) VALUES (?, 1, ?, ?, ?)')
      .run(threadId, name || DEFAULT_NAME, body, now)

    db.exec('COMMIT')

    const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(threadId)
    return c.json(thread, 201)
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
})

