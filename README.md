# ArchaeoMind: Lost Civilization

ArchaeoMind is a large-scale 3D archaeological exploration and management game.

## Project Concept
Players manage an excavation site, discover lost artifacts, and uncover the mysteries of a lost civilization, guided by a robust, deterministic AI system.

## Locked Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **3D Rendering**: Three.js, React Three Fiber, Drei
- **Backend**: Supabase (PostgreSQL)

## Symbolic AI Requirement
The game features a custom, deterministic Symbolic AI reasoning system. It strictly **does not** use machine learning, neural networks, or LLM APIs at runtime. The AI relies on knowledge graphs, rule engines, and logical chaining.

## Current Phase: Phase 0
We are currently in **Phase 0 — Project Architecture & Foundation**. 
This phase focuses entirely on setting up a scalable, robust architecture. No gameplay elements, 3D worlds, or database schemas are implemented yet.

## Development Philosophy
Development follows a strict, incremental phase-based approach. The architecture is designed to accommodate future features without necessitating massive rewrites. Logic is heavily decoupled from presentation.
