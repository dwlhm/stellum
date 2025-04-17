import { lazy, useState } from "react";
import { createRouter } from "stellum";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const Router = createRouter(
    {
      route: {
        "/": {
          layout: () => <div>Home</div>,
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
