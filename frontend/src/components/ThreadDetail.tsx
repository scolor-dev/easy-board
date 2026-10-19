import type { Thread, Post } from '../types'
import { useState, useEffect } from 'react'
import './ThreadDetail.css'

type Props = {
    thread: Thread
    onBack: () => void
}

export function ThreadDetail({ thread, onBack }: Props) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`/api/threads/${thread.id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('スレッドの読み込みに失敗しました')
                }
                return res.json()
            })
            .then((data) => setPosts(data.posts))
            .catch(() => setError('スレッドの読み込みに失敗しました'))
            .finally(() => setLoading(false))
    }   , [thread.id])

    let content
    if (loading) {
        content = <p>読み込み中...</p>
    } else if (error) {
        content = <p>{error}</p>
    } else if (posts.length === 0) {
        content = <p>投稿がありません</p>
    } else {
        content = (
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.name}</strong>
                        <p>{post.body}</p>
                        <small>{new Date(post.createdAt).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="thread-detail">
            <button onClick={onBack}>戻る</button>
            {content}
        </div>
    )
}