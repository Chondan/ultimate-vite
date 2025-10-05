# Ultimate Vite React Boilerplate

## Project Features & Setup

This project includes:

- **Vite + React + TypeScript**: Fast development and build setup
- **ESLint (Flat Config)**: Modern linting with recommended rules for JS, React, TypeScript, and Prettier integration
- **Prettier**: Automatic code formatting
- **React Router**: Client-side routing with example Home/About pages
- **Storybook**: UI component development and documentation
- **Custom Environment Variables**: Uses `envDir` and `envPrefix` for flexible environment management
- **Custom Vite Modes**: Easily run dev/build in custom modes (e.g., staging, testing)
- **Redux Toolkit**: Modern state management for React applications
- **Husky**: Git hooks for automated checks
  - Pre-commit hook runs ESLint to ensure code quality before commits

### Quick Start

1. **Install dependencies**
   ```bash
   yarn install
   ```
2. **Run development server**
   ```bash
   yarn dev
   ```
3. **Run Storybook**
   ```bash
   yarn storybook
   ```
4. **Lint and format code**
   ```bash
   yarn lint
   yarn lint:fix
   ```
5. **Custom modes**
   ```bash
   yarn dev -- --mode staging
   yarn build -- --mode testing
   ```

### Environment Variables
- All `.env` files are stored in the `/env` directory (see `vite.config.ts`)
- Only variables prefixed with `VITE_` are exposed to the client
- Supports custom modes: `.env.staging`, `.env.testing`, etc.

### Routing Example
- See `src/App.tsx` for React Router setup

### Storybook Example
- See `src/stories/` for example stories

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
