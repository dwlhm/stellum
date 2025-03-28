// src/app.tsx

import React from "react";
import { Routes } from "./libs/route/routes";
import { Outlet } from "./libs/route/outlet";
import About from "./pages/about";
import Name from "./pages/name";

const config = {
  "/": {
    layout: <h1>Home</h1>,
  },
  about: {
    layout: (
      <div>
        <h1>About</h1>
        <Outlet />
      </div>
    ),
    child: {
      dia: {
        layout: (
          <div>
            <p>Dia</p>
            <Outlet />
          </div>
        ),
        child: {
          itu: {
            layout: (
              <div>
                <p>Itu</p>
                <Outlet />
              </div>
            ),
            child: {
              istimewa: {
                layout: (
                  <div>
                    <p>Istimewa</p>
                  </div>
                ),
              },
            },
          },
        },
      },
      ":": {
        layout: <About />,
        params: (param: string) => ({
          id: Number(param),
        }),
        child: {
          ":": {
            layout: <Name />,
            params: (param: string) => ({
              name: param,
            }),
          },
        },
      },
    },
  },
};

export default function App({ data }: { data: string }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Bun, Elysia & React</title>
        <meta name="description" content="Bun, Elysia & React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Routes initialConfig={config} initialParams={data} />
      </body>
    </html>
  );
}
