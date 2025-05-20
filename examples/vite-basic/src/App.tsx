import { lazy, useState } from "react";
import { createRouter } from "stellum";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Counter } from "./counter"

function App() {
  const [count, setCount] = useState(0);

  const Router = createRouter(
    {
      route: {
        "/": {
          layout: () => <div>Home<Counter /></div>,
          child: {
            "/about": {
              layout: () => <div>About</div>,
            },
          },
        },
        about: {
          layout: ({ Outlet }) => (
            <div>
              <h1>About Page</h1>
              <Outlet />
            </div>
          ),
          child: {
            "/team": {
              layout: () => <div>Team</div>,
            },
            "/company": {
              layout: () => <div>Company</div>,
            },
            "*": {
              name: "user",
              layout: ({ params }) => <div>Team: ${params?.user}</div>,
            },
          },
        },
        counter: {
          layout: ({ Outlet }) => (
            <div>
              <p>Counter Page</p>
              <Outlet />
            </div>
          ),
          child: {
            "page": {
              layout: lazy(() => import("./counter")),
            }
          }
        },
      },
      notfound: <div>Gaada bolo</div>,
      loading: <div>Memuat!</div>,
    },
    window.location.pathname
  );

  return (
    <>
      <Router />
    </>
  );
}

export default App;
