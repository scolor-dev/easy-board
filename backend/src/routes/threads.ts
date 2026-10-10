import { Hono } from 'hono'
import { db } from '../db.js'

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
