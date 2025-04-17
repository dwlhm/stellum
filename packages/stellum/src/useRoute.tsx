import type { ReactNode } from "react";
import type { Config, RouteConfig } from "./types";
import { renderLayout } from "./renderer";
import { RouterProvider, useRouter } from "./context";

const normalizePathSegments = (path: string): string[] => {
  const segments = path.split("/").filter(Boolean);
  return segments.length ? segments : ["/"];
};

export const normalizeMultiPathSegments = (
  route: Record<string, RouteConfig>,
  segments: string[],
  position: number
) => {
  return (
    Object.keys(route).find((key) => {
      const keySegments = normalizePathSegments(key);
      if (keySegments.length <= 1) return false; // Skip single-segment keys

      return keySegments.every(
        (segment, index) =>
          segments[position + index] !== undefined &&
          segment === segments[position + index]
      );
    }) ?? null
  );
};

export const createRouter = (config: Config, initialPath: string) => {
  const RouteComponent = (): ReactNode => {
    const { path } = useRouter();
    const segments = normalizePathSegments(path);

    let rootRoute = config.route[segments[0]];

    if (!rootRoute) {
      const multiRoute = normalizeMultiPathSegments(config.route, segments, 0);

      rootRoute = config.route[multiRoute ?? ""];

      if (!rootRoute) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`No route found for path: ${segments[0]}`);
        }
        return config.notfound;
      }
    }

    try {
      return renderLayout(rootRoute, {
        routeSegments: segments,
        currentDepth: 0,
        params: {},
        context: {},
      });
    } catch (error) {
      console.error("Route rendering failed:", error);
      return config.notfound;
    }
  };

  return () => (
    <RouterProvider initialPath={initialPath}>
      <RouteComponent />
    </RouterProvider>
  );
};
