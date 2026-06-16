⚡ TypeFast — Typing Speed Test

A beautiful, addictive, and fully self-contained typing speed test application built with **pure HTML, CSS, and Vanilla JavaScript**. No frameworks, no backend, no build step — just open `index.html` and start typing.

![TypeFast Preview](https://img.shields.io/badge/TypeFast-Typing%20Speed%20Test-8b5cf6?style=for-the-badge&logo=keyboard)

---

## 📦 What's Included

| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~9 KB | Complete UI structure |
| `style.css` | ~19 KB | All styling, animations, themes |
| `script.js` | ~37 KB | Full application logic |
| **Total** | **~65 KB** | **Zero dependencies** |

> ⚠️ **External dependency**: Google Fonts CDN (Inter + JetBrains Mono) — loads once, works offline after.

---

## 🚀 Quick Start

### Option 1: Direct Open (Simplest)
1. Download all 3 files to the **same folder**
2. Double-click `index.html`
3. Start typing!

### Option 2: Local Server (Recommended for full features)
If opening directly causes issues (CORS, fonts, etc.), use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000

# VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

Then open: `http://localhost:8000`

### Option 3: VS Code Live Server (Easiest)
1. Install **"Live Server"** extension in VS Code
2. Right-click `index.html` → **"Open with Live Server"**
3. Auto-reloads on file changes

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| **Start test** | Click typing area or press any key |
| **Type** | Just start typing the displayed quote |
| **Restart** | Click "Restart" button or press `Tab` |
| **Stop early** | Press `Esc` to see partial results |
| **Toggle theme** | Click moon/sun icon in header |
| **Mute sound** | Click speaker icon in header |
| **Change duration** | Click 15s / 30s / 60s buttons |

---

## ✨ Features

### 🎯 Core Typing
- **Instant start** — no "Start" button, first keystroke begins
- **Per-character rendering** — each letter individually styled
- **Smart cursor** — amber line with glow, blinks, glides smoothly between letters
- **Backspace support** — undo mistakes freely
- **Extra characters** — red underline for over-typing
- **Missed characters** — red strikethrough when time ends

### 📊 Real-Time Stats
- **WPM** — updates live on every keystroke
- **Accuracy %** — correct vs total typed
- **Timer** — countdown with smooth progress bar
- **Characters** — correct / wrong count
- **Combo streak** — x5, x10, x25 with fire emoji
- **WPM graph** — SVG line chart per word (green=fast, yellow=medium, red=slow)

### 🏆 Gamification
- **Rank system** — 6 tiers: 🐢 Turtle → 🐰 Rabbit → 🦊 Fox → 🐆 Cheetah → ⚡ Lightning → 🔥 God Mode
- **Personal Best** — tracked in localStorage, golden celebration when beaten
- **Confetti burst** — 40 particles with gravity fall animation
- **Accuracy heatmap** — QWERTY keyboard showing per-key performance

### 🔊 Sound Effects (Web Audio API)
- ✅ Correct key — soft click
- ✅ Wrong key — dull thud
- ✅ Space — deeper clack
- ✅ Word complete — tiny ding
- ✅ New PB — ascending chime
- ✅ Last 10s — subtle tick
- 🔇 Mute toggle in header

### 🎨 Design
- **Dark theme** default (deep navy #0f0f1a)
- **Light theme** toggle with full persistence
- **3 animated mesh gradient blobs** (CSS blur, slow drift)
- **Glassmorphism** cards with `backdrop-filter: blur(20px)`
- **Smooth transitions** everywhere (0.2s–0.35s cubic-bezier)
- **Responsive** — works on desktop, tablet, mobile

### 💾 Data Persistence (localStorage)
```
typefast_history   → Last 10 tests with WPM, accuracy, rank, date
typefast_theme     → "dark" or "light"
typefast_best      → { wpm, date } — personal best
typefast_sound     → true or false
typefast_duration  → 15, 30, or 60 seconds
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Restart test instantly |
| `Esc` | Stop test, show partial results |
| `Any key` | Start test when idle |
| `Click` | Focus typing area |

---

## 🛠️ Architecture

Organized into **12 IIFE modules** with clear separation:

```
Storage      → localStorage CRUD operations
Theme        → Dark/light toggle, persistence
Audio        → Web Audio API sound generation, mute
Quotes       → 50+ quote array, random selection
Timer        → Countdown, progress bar, pulse animation
Stats        → WPM, accuracy, raw WPM, combo, rank calculation
Typing       → Input capture, char comparison, state management
Renderer     → DOM updates, text display, cursor positioning
History      → Save/load last 10 tests, highlight best
ResultModal  → Show/hide, populate data, confetti, heatmap
Confetti     → 40 particle burst animation
App          → Init, event binding, shortcut handling
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0f0f1a` | Dark background |
| `--accent-violet` | `#8b5cf6` | UI elements, buttons |
| `--accent-amber` | `#fbbf24` | Cursor, highlights |
| `--correct` | `#4ade80` | Correct characters |
| `--wrong` | `#f87171` | Wrong characters |
| `--font-ui` | Inter | UI text |
| `--font-mono` | JetBrains Mono | Typing text |

---

## ♿ Accessibility

- `aria-label` on all interactive elements
- `aria-live="polite"` for live stats updates
- `role="dialog"` + `aria-modal="true"` for result modal
- `prefers-reduced-motion` — disables animations if user prefers
- Fully keyboard-navigable (no mouse required)

---

## 📱 Responsive Breakpoints

| Screen | Behavior |
|--------|----------|
| Desktop (>640px) | 4-column stats, full layout |
| Mobile (≤640px) | 2-column stats, stacked controls, simplified history |

---

## 🐛 Troubleshooting

### "File not loading properly"
> **Use a local server** (see Quick Start Option 2/3). Opening `file://` directly can cause CORS issues with fonts and some browser features.

### "No sound"
> Click anywhere on the page first to activate the AudioContext. Browsers require user interaction before playing audio.

### "Fonts not loading"
> Ensure you have an internet connection for the first load. Google Fonts are cached afterward. For offline use, download the fonts locally.

### "Animations feel laggy"
> Check if `prefers-reduced-motion` is enabled in your OS settings. The app respects this preference.

---

## 📝 WPM Calculation

```
WPM     = (Correct Characters / 5) / (Time in minutes)
Raw WPM = (Total Characters / 5) / (Time in minutes)
Accuracy = (Correct Characters / Total Typed) × 100
```

If stopped early, calculation uses **elapsed time**.

---

## 🏅 Rank System

| WPM | Rank | Icon |
|-----|------|------|
| 0–20 | Turtle | 🐢 |
| 20–40 | Rabbit | 🐰 |
| 40–60 | Fox | 🦊 |
| 60–80 | Cheetah | 🐆 |
| 80–100 | Lightning | ⚡ |
| 100+ | God Mode | 🔥 |

---

## 📄 License

MIT — free to use, modify, and distribute.

---

**Made with ❤️ for typists who love the "one more test" feeling.
