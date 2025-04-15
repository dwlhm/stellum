import { ReactNode, useMemo } from "react";
import { Config } from "./types";
import { renderLayout } from "./renderer";

const normalizePathSegments = (path: string): string[] => {
  const segments = path.split("/").filter(Boolean);
  return segments.length ? segments : ["/"];
};

export const createRouter = (config: Config, path: string) => {
  const segments = useMemo(() => normalizePathSegments(path), [path]);

  const RouteComponent = (): ReactNode => {
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
