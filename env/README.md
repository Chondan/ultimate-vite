# Environment Variables Guide

This guide explains how to use environment variables in your Vite + React application.

## How Vite Handles Environment Variables

**Yes, Vite automatically reads from `.env` files by default!** No additional configuration is required.

Vite automatically loads environment variables from `.env` files in your project's root directory (or custom `envDir` if configured). The loading priority depends on the current mode and file naming convention.

### File Priority Order

1. **`.env`** - Loaded in all environments
2. **`.env.local`** - Loaded in all environments (ignored by Git)
3. **`.env.[mode]`** - Loaded only in specific mode (development/production)
4. **`.env.[mode].local`** - Loaded only in specific mode (ignored by Git)

### Example File Structure

```
├── .env                 # Base environment variables
├── .env.local          # Local overrides (Git ignored)
├── .env.development    # Development-specific variables
├── .env.production     # Production-specific variables
└── .gitignore          # Should include *.local files
```

## Variable Naming Convention

### Client-Side Variables (Exposed to Browser)
Variables prefixed with `VITE_` are exposed to your React application:

```bash
# ✅ Accessible in client code
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My Awesome App
VITE_FEATURE_FLAG=true
```

### Server-Side Variables (Private)
Variables without the `VITE_` prefix remain server-side only:

```bash
# ❌ NOT accessible in client code (secure)
DATABASE_URL=postgresql://...
API_SECRET_KEY=super-secret-key
JWT_SECRET=another-secret
```

## Usage in React Components

```typescript
// Access environment variables in your React code
const apiUrl = import.meta.env.VITE_API_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

console.log('API URL:', apiUrl);
console.log('Mode:', import.meta.env.MODE);
```

## Built-in Variables

Vite provides these built-in environment variables:

- `import.meta.env.MODE` - Current mode (`development` or `production`)
- `import.meta.env.DEV` - Boolean: true in development
- `import.meta.env.PROD` - Boolean: true in production
- `import.meta.env.SSR` - Boolean: true if running server-side

## TypeScript Support

Create `src/vite-env.d.ts` to add type safety:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_FEATURE_FLAG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Best Practices

1. **Never commit `.env.local`** - Add it to `.gitignore`
2. **Use `VITE_` prefix** for client-accessible variables only
3. **Keep secrets server-side** - Don't prefix sensitive data with `VITE_`
4. **Document your variables** - Add comments explaining their purpose
5. **Provide defaults** - Handle missing environment variables gracefully

## Custom Modes

You can create custom modes beyond the default `development` and `production` modes:

### Creating Custom Mode Files

```bash
# .env.staging - for staging environment
VITE_API_URL=https://staging-api.myapp.com
VITE_APP_TITLE=My App (Staging)
VITE_DEBUG_MODE=true

# .env.testing - for testing environment
VITE_API_URL=https://test-api.myapp.com
VITE_APP_TITLE=My App (Testing)
VITE_MOCK_API=true
```

### Running Vite with Custom Modes

Use the `--mode` flag to specify which environment file to load:

```bash
# Development (default)
npm run dev
# or explicitly
npm run dev -- --mode development

# Production build (default)
npm run build
# or explicitly
npm run build -- --mode production

# Custom modes
npm run dev -- --mode staging
npm run build -- --mode staging
npm run dev -- --mode testing
npm run build -- --mode testing
```

### Package.json Scripts

Add custom scripts for your modes:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:staging": "vite --mode staging",
    "dev:testing": "vite --mode testing",
    "build": "tsc -b && vite build",
    "build:staging": "tsc -b && vite build --mode staging",
    "build:testing": "tsc -b && vite build --mode testing"
  }
}
```

### Accessing Mode in Code

```typescript
// Check current mode
const currentMode = import.meta.env.MODE;

if (currentMode === 'staging') {
  console.log('Running in staging mode');
} else if (currentMode === 'testing') {
  console.log('Running in testing mode with mocks');
}

// Mode-specific logic
const enableMocks = import.meta.env.VITE_MOCK_API === 'true';
```

## Vite Configuration

You can customize environment variable behavior in your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

export default defineConfig({
  // Custom directory for environment files (default: project root)
  envDir: resolve(__dirname, './env'),
  
  // Custom prefix for client-exposed variables (default: 'VITE_')
  envPrefix: 'VITE_',
  
  // You can also use an array for multiple prefixes
  // envPrefix: ['VITE_', 'APP_'],
  
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
});
```

### Configuration Options

- **`envDir`**: Directory where Vite looks for `.env` files (relative to project root)
- **`envPrefix`**: String or array of strings that determine which variables are exposed to client
- Variables not matching the prefix remain server-side only

### Custom Directory Structure

With `envDir: './env'`, your structure would be:

```
├── env/
│   ├── .env
│   ├── .env.local
│   ├── .env.development
│   ├── .env.production
│   ├── .env.staging
│   └── README.md
├── src/
└── vite.config.ts
```

## Example Configuration

```bash
# .env.development
VITE_API_URL=http://localhost:3001/api
VITE_APP_TITLE=My App (Dev)
VITE_DEBUG_MODE=true

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_TITLE=My App
VITE_DEBUG_MODE=false
```