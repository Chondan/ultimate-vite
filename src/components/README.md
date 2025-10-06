
# Components Usage Guide

This project uses components from [shadcn/ui](https://ui.shadcn.com/docs/installation/vite) and [Tailark](https://tailark.com/hero-section) to build reusable, accessible, and modern React UIs.

## Component Sources

- **shadcn/ui**: Provides foundational UI primitives and utilities. Components are installed via the shadcn CLI and placed in the `src/components/ui/` folder.
- **Tailark**: Offers advanced UI blocks and layouts. Components are installed or copied into the project as needed.

## Naming Convention

After installing a component from shadcn/ui or Tailark, **rename the file and its exported symbol to CamelCase** style to match our project standards.

**Example:**

- If you install `button.tsx` from shadcn, rename it to `Button.tsx` and update the export:
	```tsx
	// Before
	export function Button() { ... }
	// After
	export function Button() { ... }
	// (File is now Button.tsx)
	```
- Do the same for Tailark components (e.g., `card.tsx` → `Card.tsx`).

**Why?**
- Improves code consistency and readability.
- Matches React’s convention for component names.

### Note on shadcn CLI File Detection

The shadcn CLI checks for existing files in a **case-insensitive** way (e.g., `Button.tsx` and `button.tsx` are considered the same on macOS/Windows). If a file with the same name (regardless of case) exists in the `ui` folder, the CLI will prompt to overwrite or skip, preventing accidental overwrites of your custom components.

**In short:**
- The CLI ignores case when checking filenames.
- This helps avoid overwriting your own components.

## References

- [shadcn/ui documentation](https://ui.shadcn.com/docs/installation/vite)
- [Tailark documentation](https://tailark.com/hero-section)