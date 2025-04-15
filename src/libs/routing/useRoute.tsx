import { ReactNode } from "react";
import { Config } from "./types";
import { renderLayout } from "./renderer";
import { useRouter } from "./context";

const normalizePathSegments = (path: string): string[] => {
  const segments = path.split("/").filter(Boolean);
  return segments.length ? segments : ["/"];
};

export const createRouter = (config: Config, initialPath: string) => {
  const RouteComponent = (): ReactNode => {
    const { path } = useRouter();
    const segments = normalizePathSegments(path);
    
    const rootRoute = config.route[segments[0]];

    if (!rootRoute) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`No route found for path: ${segments[0]}`);
      }
      return config.notfound;
    }

    try {
      return renderLayout(rootRoute, {
        routeSegments: segments,
        currentDepth: 0,
        params: {},
      });
    } catch (error) {
      console.error("Route rendering failed:", error);
      return config.notfound;
    }
  };

  return RouteComponent;
};
