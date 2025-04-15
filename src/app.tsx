// src/app.tsx

import React from "react";
import { createRouter } from "./libs/routing/useRoute";
import { Config } from "./libs/routing/types";
import { Link } from "./libs/routing/link";
import { RouterProvider } from "./libs/routing/context";

export default function App({ path }: { path: string }) {
  const config: Config = {
    route: {
      "/": {
        layout: () => (
          <div>
            <h1>Home</h1>
            <Link to="/about">About</Link>
          </div>
        ),
        notfound: <h1>Not Found</h1>,
      },
      about: {
        layout: React.lazy(() => import("./pages/about")),
        notfound: <h1>Not Found</h1>,
        child: {
          "*": {
            layout: ({ Outlet, param }) => (
              <div>
                <p>{JSON.stringify(param)}</p>
                <h1>{param?.user + " account" || ""}</h1>
                <Outlet />
              </div>
            ),
            notfound: <h1>Not Found</h1>,
            name: "user",
            child: {
              logout: {
                layout: (props) => (
                  <h1>Logout: {JSON.stringify(props.param)}</h1>
                ),
                notfound: <h1>Not Found</h1>,
              },
              "*": {
                layout: (props) => (
                  <h1>Account kedua: {JSON.stringify(props.param)}</h1>
                ),
                notfound: <h1>Not Found</h1>,
                name: "account",
                child: {
                  settings: {
                    layout: () => <h1>Settings</h1>,
                    notfound: <h1>Not Found</h1>,
                  },
                },
              },
            },
          },
        },
      },
    },
    notfound: <h1>Not Found</h1>,
  };

  const Route = createRouter(config, path);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Bun, Elysia & React</title>
        <meta name="description" content="Bun, Elysia & React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <RouterProvider initialPath={path}>
          <Route />
        </RouterProvider>
      </body>
    </html>
  );
}
