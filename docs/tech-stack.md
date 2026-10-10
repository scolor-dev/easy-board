# 技術スタック・決定事項

| 項目 | 内容 |
|---|---|
| パッケージ管理 | pnpm (モノレポ: `frontend/`, `backend/`) |
| ランタイム | Node.js 22 以上 |
| バックエンド | Hono + @hono/node-server |
| フロントエンド | React + Vite + TypeScript |
| DB | **SQLite** (確定) |

## 決定の記録
- 2026-10-01: DBは SQLite に確定。
  - 現在の `backend/src/store.ts` はメモリ上のモック。SQLite のアクセスに置き換える。
  - ORM / ドライバの選定は未定 (導入Issueで決める)。
