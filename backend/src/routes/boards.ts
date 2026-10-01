import { Hono } from 'hono'
import { boards, DEFAULT_NAME, nextId, posts, threads } from '../store.js'

export const boardsRoute = new Hono()

// 板の一覧
boardsRoute.get('/', (c) => c.json(boards))

// その板のスレッド一覧 (新しいレスがついた順)
boardsRoute.get('/:boardId/threads', (c) => {
  const boardId = c.req.param('boardId')
  if (!boards.some((b) => b.id === boardId)) {
    return c.json({ error: '板が見つかりません' }, 404)
  }
  const list = threads
    .filter((t) => t.boardId === boardId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  return c.json(list)
})

// スレッド作成 (1レス目も同時に作る)
boardsRoute.post('/:boardId/threads', async (c) => {
  const boardId = c.req.param('boardId')
  if (!boards.some((b) => b.id === boardId)) {
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
  const thread = {
    id: nextId.thread++,
    boardId,
    title,
    postCount: 1,
    createdAt: now,
    updatedAt: now,
  }
  threads.push(thread)
  posts.push({
    id: nextId.post++,
    threadId: thread.id,
    number: 1,
    name: name || DEFAULT_NAME,
    body,
    createdAt: now,
  })
  return c.json(thread, 201)
})
