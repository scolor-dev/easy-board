# easy-board

2ちゃんねる風の掲示板。板 → スレッド → レスの3階層。認証なし、名前は任意(空なら「名無しさん」)。
開発者は初心者中心。シンプルで読みやすいコードを優先する。

## 構成
- `frontend/` React + Vite + TypeScript (port 5173、`/api` は backend に proxy)
- `backend/` Hono + Node.js (port 3000)
- `docs/` 仕様書。API仕様は `docs/api.md`、技術選定は `docs/tech-stack.md`

## コマンド
- `pnpm dev` 両方を起動
- `pnpm dev:api` バックエンドのみ
- `pnpm typecheck` / `pnpm build` 全体

## 決定事項
- DBは **SQLite** (確定)。
- バックエンドは現在モック実装 (`backend/src/store.ts` のメモリデータ)。DBに置き換えていく。
  置き換え済みでないルートには `// STUB` の目印がある。

## 開発ルール
- **API仕様が先**: APIを変える前に `docs/api.md` を更新する。実装だけ変えない。
- ブランチ: `main` ← `develop` ← `frontend` / `backend`。作業は担当ブランチで行い、`develop` にマージする。
- Issueタイトル: `[Feature]` `[Bug]` `[Chore]` `[Docs]` の接頭辞 + 何をするか。FE/BEはラベルで区別する。
- OS差異を避ける: Windows/Linux/Mac で動くこと。シェル固有の構文をスクリプトに書かない。改行はLF。
- 日本語で会話・コミットメッセージを書く。
