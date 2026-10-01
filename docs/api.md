# API仕様

フロントエンドとバックエンドの約束事。実装を変える前に、先にここを更新する。

- ベースURL: `/api`
- 形式: JSON
- 認証なし。名前は任意で、空なら `名無しさん`
- 実装状況: 板一覧のみ実装済み。スレッド・レス系は未実装

## データ

```ts
Board  { id: string, name: string, description: string }
Thread { id: number, boardId: string, title: string, postCount: number, createdAt: string, updatedAt: string }
Post   { id: number, threadId: number, number: number, name: string, body: string, createdAt: string }
```

- `Post.number` はスレッド内の連番 (1, 2, 3...)
- 日時は ISO 8601 形式

## エンドポイント

| メソッド | パス | 内容 |
|---|---|---|
| GET | `/api/boards` | 板の一覧 |
| GET | `/api/boards/:boardId/threads` | スレッド一覧 (`updatedAt` の降順) |
| POST | `/api/boards/:boardId/threads` | スレッド作成 (1レス目も同時に作る) |
| GET | `/api/threads/:threadId` | スレッド詳細 |
| POST | `/api/threads/:threadId/posts` | レス投稿 |

### GET /api/boards
`200`: `Board[]`

### GET /api/boards/:boardId/threads
`200`: `Thread[]` / `404`: 板がない

### POST /api/boards/:boardId/threads
リクエスト
```json
{ "title": "スレタイ", "name": "たろう", "body": "1レス目の本文" }
```
- `title`: 必須、1〜100文字
- `name`: 任意、20文字以内
- `body`: 必須、1〜1000文字

`201`: 作成した `Thread` / `400`: 入力不正 / `404`: 板がない

### GET /api/threads/:threadId
`200`
```json
{ "thread": { "...": "Thread" }, "posts": [ { "...": "Post" } ] }
```
`posts` は `number` の昇順。`404`: スレッドがない

### POST /api/threads/:threadId/posts
リクエスト
```json
{ "name": "たろう", "body": "本文" }
```
- `name`: 任意、20文字以内
- `body`: 必須、1〜1000文字

`201`: 作成した `Post` / `400`: 入力不正 / `404`: スレッドがない

## エラー形式
```json
{ "error": "メッセージ" }
```
