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
  number: number
  name  : string
  body: string
  createdAt: string
}