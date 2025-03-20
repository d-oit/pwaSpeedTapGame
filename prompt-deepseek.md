(Due to technical issues, the search service is temporarily unavailable.)

Here's the complete enhanced prompt incorporating all requirements and best practices:

---

# 🚀 Speed Tap Challenge - Vite React TypeScript PWA Starter

## **Project Blueprint**

```markdown
### **1. Foundational Setup**

**Folder Structure**:
```
speed-tap-challenge/
├── .gitignore
├── .env.example
├── .clinerules
├── .rooignore
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   └── icons/ (PWA assets)
├── src/
│   ├── components/ (Atomic design structure)
│   ├── hooks/ (Custom game logic)
│   ├── styles/ (CSS Modules)
│   ├── utils/ (Helpers/config)
│   ├── tests/ (Jest + Playwright)
│   ├── App.tsx (Root component)
│   └── main.tsx (PWA registration)
├── playwright.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

**.gitignore Essentials**:
```gitignore
# Environment
.env
.env*.local

# Build artifacts
dist/
.vite/
.cache/

# Testing
playwright-report/
test-results/
```

### **2. TypeScript PWA Styleguide**

**Core Principles**:
1. **Strict Type Safety**:
   ```ts
   interface GameConfig {
     duration: number;
     targetSize: number;
     positions: [number, number][];
   }
   
   const config: GameConfig = JSON.parse(
     import.meta.env.VITE_GAME_CONFIG
   );
   ```

2. **PWA Optimization**:
   ```ts
   // vite.config.ts
   export default defineConfig({
     plugins: [
       VitePWA({
         strategies: 'injectManifest',
         srcDir: 'src',
         filename: 'service-worker.ts',
       })
     ]
   });
   ```

3. **Mobile-First Testing**:
   ```ts
   // playwright.config.ts
   export default defineConfig({
     use: {
       /* Configure from .env */
       viewport: {
         width: Number(process.env.PLAYWRIGHT_VIEWPORT_WIDTH),
         height: Number(process.env.PLAYWRIGHT_VIEWPORT_HEIGHT)
       },
       deviceScaleFactor: 2,
       isMobile: true
     }
   });
   ```

### **3. Environment Configuration**

**.env Standard**:
```env
# Game Configuration
VITE_GAME_DURATION=30
VITE_TARGET_SIZE=60
VITE_ANIMATION_DURATION=150

# Playwright Mobile Testing
PLAYWRIGHT_BASE_URL=http://localhost:3000
PLAYWRIGHT_VIEWPORT_WIDTH=375  # iPhone 12/13
PLAYWRIGHT_VIEWPORT_HEIGHT=812
PLAYWRIGHT_DEVICE="iPhone 13 Pro"
```

**Type-Safe Access**:
```ts
// src/utils/env.ts
export const getConfig = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
};
```

### **4. Phase Implementation Guides**

**development-phase.md**:
```markdown
## Mobile Interaction Checklist

1. Touch Event Handling:
   ```tsx
   const handleTouch: TouchEventHandler = (e) => {
     e.preventDefault();
     setScore(prev => prev + 1);
     requestAnimationFrame(moveTarget);
   };
   ```

2. Viewport Meta:
   ```html
   <meta name="viewport" 
         content="width=device-width, 
                  initial-scale=1.0,
                  maximum-scale=1.0,
                  user-scalable=no" />
   ```
```

**testing-phase.md**:
```markdown
## E2E Test Matrix

| Scenario              | Playwright Config          |
|-----------------------|----------------------------|
| iOS Portrait          | iPhone 13 Pro, headless    |
| Android Landscape     | Pixel 5, viewport 850x400  | 
| Tablet                | iPad Pro 12.9               |
```

### **5. Performance & Security**

**Critical Rendering Path**:
```ts
// Preload game assets
<link rel="preload" href="/sounds/tap.mp3" as="audio" />

// Dynamic import for non-critical components
const Settings = React.lazy(() => import('./Settings'));
```

**Service Worker Strategy**:
```ts
// service-worker.ts
precacheAndRoute([
  { url: '/', revision: 'v1' },
  { url: '/app-shell', revision: 'v1' },
  { url: '/manifest.json', revision: 'v1' }
]);
```

### **6. Code Quality Enforcement**

**.clinerules**:
```yaml
rules:
  max-params: 3
  max-depth: 4
  no-nested-ternary: error
  type-annotations: required
```

**Pre-commit Hooks**:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run test:changed"
    }
  }
}
```

---

**Implementation Ready**: This prompt provides a complete foundation for building a production-grade PWA game with strict TypeScript practices, comprehensive testing workflows, and performance-first mobile implementation. All environment configuration remains centralized and type-safe.