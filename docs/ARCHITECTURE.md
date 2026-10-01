# ArchaeoMind: Lost Civilization - System Architecture

The architecture enforces a strict separation of concerns to allow incremental development across phases.

## Layers
1. **Presentation Layer (React/UI)**: Manages menus, HUDs, dialogs, and user input. Does not contain core game logic or direct database queries.
2. **3D Render Layer (Three.js/R3F)**: Strictly handles rendering and 3D interactions. Separated from management UI.
3. **State Management (Zustand)**: Acts as the single source of truth for the client. Coordinates between UI, 3D, and AI layers.
4. **Game Systems**: Modular systems handling specific game mechanics (e.g., economy, inventory).
5. **Symbolic AI Engine**: Operates independently of the UI. Contains the knowledge base and rule engine.
6. **Data Layer (Supabase)**: Handles persistence. UI components should rarely query this directly; data is fetched into Zustand or Game Systems first.
