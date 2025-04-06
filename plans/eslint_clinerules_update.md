# ESLint Setup and `.clinerules` Update Plan

## 1. ESLint Configuration for `speed-tap-challenge/src`

### Goals
- Lint **only** the TypeScript/React source files inside `speed-tap-challenge/src/`
- Ignore build output, dependencies, and unrelated files
- Use the recommended parser and plugins effectively
- Ensure the lint script respects this scope

### Recommended ESLint Config (`speed-tap-challenge/eslint.config.js`)

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'public', 'node_modules', 'coverage'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

### `.eslintignore`

```
dist/
public/
node_modules/
coverage/
```

### Lint Script in `package.json`

```json
"lint": "eslint src"
```

---

## 2. Updated `.clinerules` (Scoped to `speed-tap-challenge/src`)

```yaml
# Role Mappings Configuration

# File Pattern Based Mappings
file_patterns:
  - pattern: "speed-tap-challenge/src/.*\\.(spec|test)\\.(ts|tsx|js|jsx)$"
    role: playwright
    description: "End-to-end test files"
    priority: 1

  - pattern: "speed-tap-challenge/src/(__tests__/.*|__mocks__/.*|.*\\.test\\.(ts|tsx|js|jsx)$)"
    role: jest-test-engineer
    description: "Unit test files and mocks"
    priority: 1

  - pattern: "speed-tap-challenge/src/.*\\.(md|mdx)$|README"
    role: document-writer
    description: "Documentation files"
    priority: 1

  - pattern: "docs/.*|plans/.*"
    role: document-writer
    description: "Documentation directories"
    priority: 1

  - pattern: "\\.roomodes$|cline_custom_modes\\.json$"
    role: orchestrator
    description: "Mode configuration files"
    priority: 2

# Component Type Mappings
component_types:
  - directory: "speed-tap-challenge/src/components"
    role: code
    description: "React components"
    
  - directory: "speed-tap-challenge/src/hooks"
    role: code
    description: "React hooks"
    
  - directory: "speed-tap-challenge/src/services"
    role: code
    description: "Service layer"
    
  - directory: "speed-tap-challenge/src/store"
    role: code
    description: "State management"
    
  - directory: "speed-tap-challenge/src/types"
    role: code
    description: "Type definitions"

  - directory: "speed-tap-challenge/src/tests"
    role: playwright
    description: "Playwright tests"

  - directory: "speed-tap-challenge/src/__tests__"
    role: jest-test-engineer
    description: "Jest tests"  

# Fallback Rules
fallbacks:
  - condition: "new_feature"
    role: architect
    description: "New feature planning"

  - condition: "improve_design"
    role: designer
    description: "Improve ui/ux design"  
    
  - condition: "implementation"
    role: code
    description: "Implementation work"

  - condition: "default"
    role: architect
    description: "Default role for all other files"
    priority: 0  

# Validation Rules
validation:
  - rule: "no_pattern_conflicts"
    description: "File patterns must not overlap"
    
  - rule: "capability_check"
    description: "Roles must have necessary capabilities"
    
  - rule: "fallback_required"
    description: "Every scenario must have a fallback role"

# Mode Capabilities
capabilities:
  playwright:
    - "test_automation"
    - "e2e_testing"
    
  jest-test-engineer:
    - "unit_testing"
    - "mocking"
    
  document-writer:
    - "documentation"
    - "specifications"
    
  orchestrator:
    - "task_coordination"
    - "mode_management"
    
  architect:
    - "system_design"
    - "technical_planning"
    
  code:
    - "implementation"
    - "maintenance"

  designer:
    - "ui/ux design"
    - "mockups"
```

---

## 3. Next Steps

- Switch to **Code** or **Orchestrator** mode to implement `.clinerules` update.
- Update `eslint.config.js` and `.eslintignore` as planned.
- Run `npm run lint` inside `speed-tap-challenge` to verify.