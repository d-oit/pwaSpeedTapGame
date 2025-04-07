# Missing Features Implementation Plan - Frontend Integration with Backend API

---

## Overview

This document outlines the detailed plan to integrate the existing backend API (Node.js + Express + TypeScript) with the frontend React PWA. The focus is on implementing missing features related to **node versioning** and **permission management**, including custom hooks, UI components, and testing strategy.

---

## 1. Custom React Hooks

### `useNodes`

- **Responsibilities:**
  - Fetch all nodes (`GET /api/nodes`)
  - Create a new node (`POST /api/nodes`)
  - Update a node (`PUT /api/nodes/:id`)
  - Fetch version history (`GET /api/nodes/:id/versions`)
  - Restore a version (via update endpoint)
- **Implementation:**
  - Use `useState` and `useEffect` for data management
  - Use `fetch` or `axios` for API calls
  - Expose functions: `getNodes`, `createNode`, `updateNode`, `getVersions`, `restoreVersion`

### `usePermissions`

- **Responsibilities:**
  - Fetch permissions (`GET /api/permissions`)
  - Grant permission (`POST /api/permissions`)
  - Revoke permission (optional, if supported)
- **Implementation:**
  - Similar pattern as `useNodes`
  - Expose functions: `getPermissions`, `grantPermission`, `revokePermission`

---

## 2. UI Components

### Node Management UI

- **Node List View**
  - Display all nodes with basic info
  - Buttons to view/edit node details
- **Node Detail View**
  - Show node data
  - List version history
  - Button to restore a previous version
  - Form to update node data
- **Create Node Form**
  - Input fields for new node data
  - Submit button to create node

### Permission Management UI

- **Permissions List**
  - Display current permissions per node/user
- **Grant Permission Form**
  - Select user and node
  - Set permissions (view/edit)
  - Submit button to grant permission
- **Revoke Permission Button**
  - Remove permission for a user/node

### Integration with Existing UI

- Add links/buttons in the game UI to access node/version management and permissions
- Optionally, use modals or separate pages

---

## 3. Testing Strategy

### Unit Tests

- Test hooks (`useNodes`, `usePermissions`)
  - Mock API responses
  - Verify state updates and error handling
- Test UI components
  - Rendering with mock data
  - User interactions (clicks, form submissions)

### Integration Tests

- Simulate full workflows:
  - Creating/updating nodes
  - Viewing/restoring versions
  - Granting/revoking permissions

### E2E Tests (Playwright)

- User flows:
  - Node CRUD operations
  - Version history navigation
  - Permission management
- Verify backend integration works as expected

---

## 4. Architecture Diagram

```mermaid
flowchart TD
    subgraph Frontend (React PWA)
        A[GameBoard]
        B[useNodes Hook]
        C[usePermissions Hook]
        D[Node Management UI]
        E[Permission Management UI]
    end

    subgraph Backend (Node.js + Express)
        F[NodeController]
        G[PermissionController]
        H[In-memory/JSON Storage]
    end

    A --> B
    A --> C
    B -->|Fetch/Create/Update| F
    C -->|Grant/Revoke| G
    F --> H
    G --> H
    D --> B
    E --> C
```

---

## Summary

- The backend API is implemented.
- The frontend lacks integration for node versioning and permission management.
- This plan details how to build custom hooks, UI components, and tests to fully integrate backend features into the frontend.

---