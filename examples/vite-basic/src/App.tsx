import { createRouter } from "stellum";
import type { RouteProps } from "stellum";
import "./App.css";
import HomePage from "./features/home/components/HomePage.tsx"
import AboutPage from "./features/about/components/AboutPage.tsx"
import { AboutMiddleware } from "./features/about/components/AboutMiddleware.tsx"
import { Blog, BlogCategory, BlogPost } from "./features/blog/blog.tsx"

function App() {

  const Router = createRouter(
    {
      route: {
        "/": {
          layout: HomePage,
        },
        about: {
          layout: AboutPage,
          child: {
            "/team/dwlhm": {
              layout: () => <div>Team/dwlhm</div>,
            },
            "company": {
              layout: () => <div>Company</div>,
            },
            "*": {
              name: "user",
              layout: ({ params }: RouteProps) => <div>Team: {params?.user}</div>,
              middleware: AboutMiddleware,
            },
          },
        },
        blog: {
          layout: Blog,
          child: {
            "*": {
              name: "category",
              layout: BlogCategory,
              child: {
                "*": {
                  name: "slug",
                  layout: BlogPost,
                },
              },
            },
          },
        },
        counter: {
          layout: ({ Outlet }: RouteProps) => (
            <div>
              <p>Counter Page</p>
              <Outlet />
            </div>
          ),
          child: {
            "page": {
              lazyLayout: () => import("./counter"),
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
