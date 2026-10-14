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