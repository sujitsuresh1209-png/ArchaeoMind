# ArchaeoMind: Lost Civilization - Database Design

## Overview
The database will be hosted on Supabase (PostgreSQL).

*Note: In Phase 0, no tables or schemas are implemented. This document serves as a blueprint for future phases.*

## Future Architecture
- **Authentication**: Managed via Supabase Auth.
- **User Data**: Profiles, settings, and progress.
- **Game State**: Persistence of the world state, discovered artifacts, and management metrics.
- **AI State**: Persistence of the knowledge base and inferred facts.

All tables will use Row Level Security (RLS) to ensure data integrity and security.
