# ArchaeoMind: Lost Civilization - Coding Rules

1. **TypeScript Preferred**: Use TS strictly. Avoid unnecessary `any` types.
2. **Modular Systems**: Keep systems decoupled.
3. **Separation of Concerns**:
   - Do NOT mix AI logic with UI components.
   - Do NOT put game logic directly inside React presentation components.
   - Do NOT scatter Supabase queries throughout arbitrary UI components.
   - Keep 3D logic separated from management UI.
4. **Stability & Refactoring**: Do not rewrite working systems without a strong reason.
5. **Backward Compatibility**: Preserve backward compatibility with previous phases.
6. **Testing**: Every phase must include regression testing to ensure foundational stability.
