import { Hono } from 'hono'
import { db, DEFAULT_NAME } from '../db.js'

export const threadsRoute = new Hono()

threadsRoute.get('/:threadId', (c) => {
  const threadId = Number(c.req.param('threadId'))

  const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(threadId)
  if (!thread) {
    return c.json({ error: 'スレッドが見つかりません' }, 404)
  }

  const posts = db
    .prepare('SELECT * FROM posts WHERE threadId = ? ORDER BY number ASC')
    .all(threadId)

  return c.json({ thread, posts })
})

threadsRoute.post('/:threadId/posts', async (c) => {
  const threadId = Number(c.req.param('threadId'))

  const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(threadId)
  if (!thread) {
    return c.json({ error: 'スレッドが見つかりません' }, 404)
  }

  const input = await c.req.json().catch(() => null)
  const name = typeof input?.name === 'string' ? input.name.trim() : ''
  const body = typeof input?.body === 'string' ? input.body.trim() : ''

  if (name.length > 20) {
    return c.json({ error: 'nameは20文字以内で入力してください' }, 400)
  }
  if (body.length < 1 || body.length > 1000) {
    return c.json({ error: 'bodyは1〜1000文字で入力してください' }, 400)
  }

  const now = new Date().toISOString()
  const number = Number(thread.postCount) + 1

  db.exec('BEGIN')
  try {
    const result = db
      .prepare('INSERT INTO posts (threadId, number, name, body, createdAt) VALUES (?, ?, ?, ?, ?)')
      .run(threadId, number, name || DEFAULT_NAME, body, now)

    db.prepare('UPDATE threads SET postCount = ?, updatedAt = ? WHERE id = ?')
      .run(number, now, threadId)

    db.exec('COMMIT')

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(Number(result.lastInsertRowid))
    return c.json(post, 201)
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
})
