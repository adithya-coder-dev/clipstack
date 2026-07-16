# 📋 ClipStack

> **Work in Progress** 🚧

ClipStack is a modern desktop clipboard manager built using **React**, **TypeScript**, **Rust**, **Tauri**, and **SQLite**.

The goal of ClipStack is to provide a fast, lightweight, and intelligent clipboard management experience with searchable history, smart content detection, and productivity-focused features.

---

## 🚧 Project Status

**Current Status:** In Development

This project is actively being developed and is not yet feature complete. Core functionality has been implemented while several improvements and stability fixes are still in progress.

---

# ✨ Features Completed

## Clipboard

- ✅ Clipboard monitoring
- ✅ Automatic clipboard history
- ✅ SQLite storage
- ✅ Duplicate clipboard filtering
- ✅ Empty clipboard filtering

---

## Search

- ✅ Dedicated search window
- ✅ Live clipboard search
- ✅ Modern UI
- ✅ Fast filtering

---

## Desktop Features

- ✅ Built with Tauri
- ✅ Native Windows desktop application
- ✅ Global shortcut (Ctrl + Shift + Space)
- ✅ Floating popup window
- ✅ Multi-window architecture

---

## Clipboard Actions

- ✅ Copy item again
- ✅ Delete clipboard item
- ✅ Pin clipboard item
- ✅ Favorite clipboard item
- ✅ Clear clipboard history

---

## Smart Detection

Automatically detects clipboard content types.

Current supported types include:

- GitHub URLs
- URLs
- JSON
- Markdown
- File Paths
- Colors
- Email
- SQL
- Base64
- UUID
- Terminal Commands
- Plain Text

---

## User Interface

- Dark modern UI
- Sidebar navigation
- Clipboard cards
- Type badges
- Smart previews (architecture implemented)
- Search interface

---

# 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS

### Backend

- Rust
- Tauri

### Database

- SQLite (rusqlite)

### Other Libraries

- arboard
- regex
- serde
- serde_json

---

# 🚀 Planned Features

- System tray support
- Export / Import clipboard history
- Collections
- Analytics dashboard
- Auto start with Windows
- Keyboard navigation improvements
- Rich previews
- Improved popup animations
- Performance optimization

---

# ⚠ Current Known Issues

This project is still under active development.

Known issues currently being worked on:

- Search window lifecycle improvements
- Popup lifecycle improvements
- Global shortcut stability
- General code cleanup and optimization

---

# 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── hooks/
 ├── types/

src-tauri/
 ├── actions/
 ├── clipboard.rs
 ├── database.rs
 ├── detectors/
 └── main.rs
```

---

# 🎯 Purpose

This project was built to learn and demonstrate:

- Desktop application development
- Rust
- Tauri
- React + TypeScript
- SQLite
- Global shortcuts
- Clipboard monitoring
- Multi-window desktop architecture

---

# 📌 Version

Current Version:

**v0.9.0 (Work in Progress)**

---
# Screenshots

![Uploading Screenshot (56).png…]()

![Uploading Screenshot (55).png…]()

![Uploading Screenshot (54).png…]()


# 📄 License

MIT License
