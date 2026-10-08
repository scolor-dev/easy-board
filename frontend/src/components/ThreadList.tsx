import type { Board, Thread } from '../types'
import { useState, useEffect } from 'react'
import './ThreadList.css'

type Props = {
    board: Board
    onBack: () => void
}

export function ThreadList({ board, onBack }: Props) {
    const [threads, setThreads] = useState<Thread[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`/api/boards/${board.id}/threads`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('スレッドの読み込みに失敗しました')
                }
                return res.json()
            })
            .then((data) => setThreads(data))
            .catch(() => setError('スレッドの読み込みに失敗しました'))
            .finally(() => setLoading(false))
    }, [board.id])

    let content
    if (loading) {
        content = <p>読み込み中...</p>
    } else if (error) {
        content = <p>{error}</p>
    } else if (threads.length === 0) {
        content = <p>スレッドがありません</p>
    } else {
        content = (
            <ul>
                {threads.map((thread) => (
                    <li key={thread.id}>
                        <h3>{thread.title}</h3>
                        <p>投稿数: {thread.postCount}</p>
                        <p>作成日: {new Date(thread.createdAt).toLocaleString("ja-JP")}</p>
                        <p>更新日: {new Date(thread.updatedAt).toLocaleString("ja-JP")}</p>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <section className="thread-list">
            <button type="button" className="back-button" onClick={onBack}>
                戻る
            </button>
            <h2>{board.name}</h2>
            {content}
        </section>
    )
}
