import { DatabaseSync } from 'node:sqlite'

export const db = new DatabaseSync('easy-board.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS boards (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL
  )
`)

db.exec(`
  INSERT OR IGNORE INTO boards (id, name, description) VALUES
    ('Leagueoflegends', 'LoL', 'LoLの話題'),
    ('Fit', '大学', '福岡工業大学の話題')
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS threads (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    boardId   TEXT    NOT NULL REFERENCES boards(id),
    title     TEXT    NOT NULL,
    postCount INTEGER NOT NULL DEFAULT 0,
    createdAt TEXT    NOT NULL,
    updatedAt TEXT    NOT NULL
  )
`)

db.exec(`
  INSERT OR IGNORE INTO threads (id, boardId, title, postCount, createdAt, updatedAt) VALUES
    (1, 'Leagueoflegends', '初心者おすすめチャンプ', 0, '2026-10-01T09:00:00.000Z', '2026-10-01T09:00:00.000Z'),
    (2, 'Leagueoflegends', '今のメタについて',       0, '2026-10-01T10:00:00.000Z', '2026-10-01T12:00:00.000Z'),
    (3, 'Fit',             '学食のおすすめ',         0, '2026-10-01T11:00:00.000Z', '2026-10-01T11:00:00.000Z')
`)
