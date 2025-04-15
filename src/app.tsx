// src/app.tsx

import React, { useMemo } from "react";
// import About from "./pages/about";
import { createRouter } from "./libs/routing/useRoute";
import { Config } from "./libs/routing/types";

const About = React.lazy(() => import("./pages/about"));

export default function App({ path }: { path: string }) {
  const config: Config = {
    route: {
      "/": {
        layout: () => <h1>Home</h1>,
        notfound: <h1>Not Found</h1>,
        default: <h1>Default</h1>,
        error: <h1>Error</h1>,
      },
      about: {
        layout: (props) => <About Outlet={props.Outlet} param={props.param} />,
        notfound: <h1>Not Found</h1>,
        default: <h1>Default</h1>,
        error: <h1>Error</h1>,
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
            default: <h1>Default</h1>,
            error: <h1>Error</h1>,
            name: "user",
            child: {
              logout: {
                layout: (props) => <h1>Logout: {JSON.stringify(props.param)}</h1>,
                notfound: <h1>Not Found</h1>,
                default: <h1>Default</h1>,
                error: <h1>Error</h1>,
              },
              "*": {
                layout: (props) => <h1>Account kedua: {JSON.stringify(props.param)}</h1>,
                notfound: <h1>Not Found</h1>,
                default: <h1>Default</h1>,
                error: <h1>Error</h1>,
                name: "account",
                child: {
                  settings: {
                    layout: () => <h1>Settings</h1>,
                    notfound: <h1>Not Found</h1>,
                    default: <h1>Default</h1>,
                    error: <h1>Error</h1>,
                  },
                },
              }
            },
          },
        },
      },
    },
    notfound: <h1>Not Found</h1>,
    default: <h1>Default</h1>,
    error: <h1>Error</h1>,
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
