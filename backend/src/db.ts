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
