# Stellum

A lightweight, modern router for React applications with built-in SSR support. Stellum provides a simple yet powerful way to handle routing in your React applications.

## 🌟 Key Features

### 1. Flexible Route Configuration
- Declarative route definitions
- Nested routing support
- Dynamic route parameters
- Catch-all routes
- Custom route patterns

### 2. Performance Optimizations
- Zero runtime dependencies
- Code splitting support
- Lazy loading support
- Minimal bundle size
- Efficient route matching

### 3. Developer Experience
- Simple and intuitive API
- Comprehensive error handling
- Loading and error states
- Easy debugging

## 📦 Installation

```bash
npm install stellum
# or
yarn add stellum
# or
pnpm add stellum
```

## 🚀 Basic Usage

```tsx
import { createRouter } from 'stellum';

function App() {

  const initialPath = window.location.pathname;

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

  return (
    <>
      <Router />
    </>
  );
}
```

## 📚 Core Concepts

### Route Configuration
Routes are defined using a simple object structure:
```tsx
{
  route: {
    path: {
      layout: Component,
      child?: RouteConfig,
      name?: string
    }
  }
}
```

### Route Parameters
Access dynamic route parameters in your components:
```tsx
const UserPage = ({ params }) => {
  return <div>User ID: {params.userId}</div>;
};
```

### Nested Routes
Create complex routing hierarchies:
```tsx
{
  "dashboard": {
    layout: DashboardLayout,
    child: {
      "profile": { layout: ProfilePage },
      "settings": { layout: SettingsPage }
    }
  }
}
```

### Lazy Loading
Implement code splitting with lazy loading:
```tsx
import { lazy } from 'react';

{
  "heavy-page": {
    layout: lazy(() => import('./HeavyPage'))
  }
}
```

## 🔧 Advanced Features

### Custom Route Patterns
Define custom route patterns for complex matching:
```tsx
{
  "products/:category/:id": {
    layout: ProductPage,
    name: "product"
  }
}
```

### Loading States
Handle loading states for better UX:
```tsx
const Router = createRouter({
  route: { /* ... */ },
  loading: <LoadingSpinner />
});
```

### Error Handling
Customize error pages and handling:
```tsx
const Router = createRouter({
  route: { /* ... */ },
  notfound: <Custom404Page />
});
```

## 📖 API Reference

### createRouter
```tsx
createRouter(config: RouterConfig, initialPath?: string): React.Component
```

### RouterConfig
```tsx
interface RouterConfig {
  route: RouteConfig;
  notfound?: React.ReactNode;
  loading?: React.ReactNode;
}
```

### RouteConfig
```tsx
interface RouteConfig {
  [path: string]: {
    layout: React.ComponentType;
    child?: RouteConfig;
    name?: string;
  }
}
```

## 🤝 Contributing

We welcome contributions!

## 📄 License

MIT © dwlhm