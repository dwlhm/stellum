// src/app.tsx

import React from "react";
import { createRouter } from "./libs/routing/useRoute";
import { Config } from "./libs/routing/types";
import { Link } from "./libs/routing/link";

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
        middleware: () => {
          return {
            context: {
              hello: "hi",
            },
          };
        },
        child: {
          "*": {
            layout: ({ Outlet, param }) => (
              <div>
                <p>{JSON.stringify(param)}</p>
                <h1>{param?.user + " account" || ""}</h1>
                <Outlet />
              </div>
            ),
            middleware: () => {
              return {
                context: {
                  name: "dwlhm",
                },
              };
            },
            notfound: <h1>Not Found</h1>,
            name: "user",
            child: {
              logout: {
                layout: (props) => (
                  <h1>
                    Logout: {JSON.stringify(props.param)} -{" "}
                    {JSON.stringify(props.context)}
                  </h1>
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
      "berita/antara/news": {
        layout: () => <h1>Berita Antara</h1>,
        notfound: <h1>Not Found</h1>,
      },
      a: {
        layout: ({ Outlet }) => (
          <div>
            <h1>A</h1>
            <Outlet />
          </div>
        ),
        middleware: () => {
          return {
            context: { hello: "hi" },
          };
        },
        child: {
          "b/c/d": {
            layout: ({ context }) => <h1>B C D: {context?.hello as string}</h1>,
          },
        },
      },
    },
    notfound: <h1>Not Found</h1>,
    loading: <p>Loading...</p>,
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
        <Route />
      </body>
    </html>
  );
}
