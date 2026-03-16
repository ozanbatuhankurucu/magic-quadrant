# Magic Quadrant

An interactive Magic Quadrant chart builder inspired by [Gartner's Magic Quadrant](https://www.gartner.com/en/research/methodologies/magic-quadrants-research). Plot and compare items across two dimensions — **Completeness of Vision** and **Ability to Execute** — to visually categorize them into four quadrants: Leaders, Challengers, Visionaries, and Niche Players.

## Features

- **Interactive SVG chart** — drag points directly on the chart to reposition them
- **Inline data editing** — edit labels, coordinates, and colors from the side panel
- **Color categories** — assign individual colors to each point
- **Undo / Redo** — full history with keyboard shortcuts (`Ctrl+Z` / `Ctrl+Shift+Z`)
- **Dark mode** — toggle between light and dark themes (respects OS preference)
- **Export as PNG** — save the chart as a high-resolution image
- **Export / Import JSON** — save and load point data as JSON files
- **Grid lines toggle** — show or hide 10-unit reference grid
- **Point visibility** — hide individual points without deleting them
- **Hover tooltips** — view exact coordinates on hover
- **Responsive layout** — side-by-side on desktop, stacked on mobile
- **LocalStorage persistence** — data is saved automatically between sessions

## Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for development and builds
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
```

Outputs to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── DataPanel.tsx        # Side panel with point list and editing controls
│   ├── Header.tsx           # App bar with export/import and dark mode toggle
│   └── MagicQuadrant.tsx    # SVG chart with drag-and-drop
├── hooks/
│   ├── useDarkMode.ts       # Dark mode with localStorage + OS detection
│   └── useUndoRedo.ts       # Generic undo/redo state reducer
├── App.tsx                  # Root component and state management
├── constants.ts             # Colors, chart dimensions, sample data
├── types.ts                 # TypeScript type definitions
├── utils.ts                 # Export, import, and point creation helpers
├── main.tsx                 # Entry point
└── index.css                # Tailwind base styles
```

## Deployment

When deploying to a static hosting service (e.g. AWS Amplify, Netlify, Vercel), set:

- **Build command:** `npm run build`
- **Output directory:** `dist`
