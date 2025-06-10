# ⚡ Lightweight TCP Protocol in Node.js

A minimal, custom-built TCP-based communication protocol using **pure Node.js**, designed to simulate real-world server-to-server communication with reliable, framed messaging, debouncing, and reconnect handling.

---

## 🚀 Features

- 📦 **Framed Messages** using `[SOF]` and `[EOF]` tags
- ⏱️ **Debounced Sending** (Default: 30 seconds)
- 🔁 **Auto Reconnect** with exponential backoff
- 🧵 **Buffered Message Parsing** on server
- ❌ **No external dependencies** — just Node.js core
- ✅ Clean, readable logs for demo and debugging

---
