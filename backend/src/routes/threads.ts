import { Hono } from 'hono'
import { DEFAULT_NAME, nextId, posts, threads } from '../store.js'

export const threadsRoute = new Hono()

// スレッド詳細 (スレッド情報とレス一覧)
threadsRoute.get('/:threadId', (c) => {
  const thread = threads.find((t) => t.id === Number(c.req.param('threadId')))
  if (!thread) {
    return c.json({ error: 'スレッドが見つかりません' }, 404)
  }
  const threadPosts = posts
    .filter((p) => p.threadId === thread.id)
    .sort((a, b) => a.number - b.number)
  return c.json({ thread, posts: threadPosts })
})

// レスを投稿
threadsRoute.post('/:threadId/posts', async (c) => {
  const thread = threads.find((t) => t.id === Number(c.req.param('threadId')))
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
  const post = {
    id: nextId.post++,
    threadId: thread.id,
    number: thread.postCount + 1,
    name: name || DEFAULT_NAME,
    body,
    createdAt: now,
  }
  posts.push(post)
  thread.postCount += 1
  thread.updatedAt = now
  return c.json(post, 201)
})
