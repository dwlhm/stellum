import { lazy } from "react";
import { createRouter } from "stellum";
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
              layout: ({ params }) => <div>Team: ${params?.user}</div>,
              middleware: ({ params }) => AboutMiddleware({ params }), 
            },
          },
        },
        blog: {
          layout: Blog,
          child: {
            "*": {
              name: "category",
              layout: ({ params, Outlet }) => <BlogCategory params={params} Outlet={Outlet} />,
              child: {
                "*": {
                  name: "slug",
                  layout: ({ params }) => <BlogPost params={params} />,
                },
              },
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
