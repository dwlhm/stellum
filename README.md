# React SSR with Elysia and Bun

A server-side rendering implementation using React, Elysia, and Bun runtime with built-in routing system.

## Features

- ⚡️ Server-side rendering with React
- 🛠️ Built-in routing system with code splitting
- 🔄 Lazy loading components
- 📦 Zero-config bundling with Vite
- 🚀 Fast refresh development experience

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/try-elysia.git
cd try-elysia
```

2. Install dependencies:
```bash
bun install
```

3. Start development server:
```bash
bun run dev
```

## Project Structure

```
src/
├── libs/
│   └── routing/         # Custom routing implementation
│       ├── context.tsx  # Router context and provider
│       ├── link.tsx     # Link component for navigation
│       ├── renderer.tsx # Route rendering logic
│       ├── types.tsx    # TypeScript types
│       └── useRoute.tsx # Router hook
├── pages/              # Route components
├── app.tsx            # Root application component
├── client.tsx         # Client-side entry point
└── server.ts          # Server-side entry point
```

## Routing Example

```tsx
const config: Config = {
  route: {
    "/": {
      layout: HomePage,
      notfound: <NotFound />,
    },
    "about": {
      layout: React.lazy(() => import("./pages/about")),
      loading: <Loading />,
      child: {
        "*": {
          layout: UserLayout,
          name: "user"
        }
      }
    }
  }
};
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server

## License

MIT License