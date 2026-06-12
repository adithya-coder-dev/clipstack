use rusqlite::{Connection, Result};
use serde::Serialize;

const DB_PATH: &str = "../clipstack.db";

pub fn init_db() -> Result<()> {

    let conn = Connection::open(DB_PATH)?;

    conn.execute(
        "
        CREATE TABLE IF NOT EXISTS clipboard_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        ",
        [],
    )?;

    println!("Database initialized");

    Ok(())
}
pub fn save_clipboard(
    text: &str,
    content_type: &str
) {

    let conn = Connection::open(DB_PATH).unwrap();

    conn.execute(
        "
        INSERT INTO clipboard_history
        (content, type)

        VALUES (?1, ?2)
        ",
        [text, content_type],
    ).unwrap();

    println!("Saved to DB");
}

pub fn get_history() -> Vec<ClipboardItem> {

    let conn = Connection::open(DB_PATH).unwrap();

    let mut stmt = conn
        .prepare(
            "
            SELECT content, type
            FROM clipboard_history
            ORDER BY id DESC
            "
        )
        .unwrap();

    let rows = stmt
        .query_map([], |row| {

            Ok(ClipboardItem {

                content: row.get(0)?,

                content_type: row.get(1)?,
            })

        })
        .unwrap();

    let mut history = Vec::new();

    for row in rows {

        history.push(row.unwrap());
    }

    history
}

#[derive(Serialize)]

pub struct ClipboardItem {

    pub content: String,

    pub content_type: String,
}