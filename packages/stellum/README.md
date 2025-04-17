# Stellum

A lightweight router for React with SSR support.

## Features
- 🚀 SSR out of the box
- 📦 Zero dependencies
- 🔄 Code splitting support
- 🛠️ Type-safe routing

## Installation
```bash
npm install stellum
```

## Quick Start
```tsx
import { createRouter } from 'stellum';

const Router = createRouter({
  route: {
    "/": {
      layout: HomePage,
    },
    "about": {
      layout: AboutPage,
      child: {
        "*": {
          layout: UserPage,
          name: "userId"
        }
      }
    }
  },
  notfound: <NotFound />,
  loading: <Loading />
}, initialPath);