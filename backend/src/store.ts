// STUB: メモリ上のモックデータ。再起動すると初期状態に戻る。
// API担当は、ここをDBアクセスに置き換える。

export type Board = {
  id: string
  name: string
  description: string
}

export type Thread = {
  id: number
  boardId: string
  title: string
  postCount: number
  createdAt: string
  updatedAt: string
}

export type Post = {
  id: number
  threadId: number
  number: number // スレッド内の連番 (1, 2, 3...)
  name: string
  body: string
  createdAt: string
}

export const DEFAULT_NAME = '名無しさん'

export const boards: Board[] = [
  { id: 'chat', name: '雑談', description: '何でも話せる板' },
  { id: 'tech', name: '技術', description: 'プログラミングの話題' },
]

export const threads: Thread[] = [
  {
    id: 1,
    boardId: 'chat',
    title: 'はじめまして',
    postCount: 2,
    createdAt: '2026-10-01T09:00:00.000Z',
    updatedAt: '2026-10-01T09:30:00.000Z',
  },
  {
    id: 2,
    boardId: 'tech',
    title: 'Honoについて語る',
    postCount: 1,
    createdAt: '2026-10-01T10:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z',
  },
]

export const posts: Post[] = [
  {
    id: 1,
    threadId: 1,
    number: 1,
    name: DEFAULT_NAME,
    body: 'よろしくお願いします',
    createdAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: 2,
    threadId: 1,
    number: 2,
    name: 'たろう',
    body: 'よろしく!',
    createdAt: '2026-10-01T09:30:00.000Z',
  },
  {
    id: 3,
    threadId: 2,
    number: 1,
    name: DEFAULT_NAME,
    body: '軽くて速い',
    createdAt: '2026-10-01T10:00:00.000Z',
  },
]

// 次に採番するID (STUB用。DBならAUTO_INCREMENTなどが担う)
export const nextId = {
  thread: 3,
  post: 4,
}
