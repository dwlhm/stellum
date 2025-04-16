import { ReactNode, Suspense, useCallback, createElement } from "react";
import { RouteConfig, RouteProps } from "./types";
import { normalizeMultiPathSegments } from "./useRoute";

interface RenderContext {
  routeSegments: string[];
  currentDepth: number;
  params: Record<string, string>;
  context: Record<string, unknown>;
}

// Helper untuk cek lazy component
const isLazyComponent = (component: any): boolean => {
  return (
    typeof component?.$$typeof === "symbol" &&
    component.$$typeof.toString() === "Symbol(react.lazy)"
  );
};

export const renderLayout = (
  config: RouteConfig,
  { routeSegments, currentDepth, params, context }: RenderContext
): ReactNode => {
  if (config.middleware) {
    const { MiddlewareComponent, context: middlewareContext } =
      config.middleware({
        context,
      });

    if (MiddlewareComponent) {
      const props = {
        Outlet: () => <></>,
        param: params,
        context: { ...context, ...middlewareContext },
      };
      return createElement(MiddlewareComponent, props);
    }

    context = { ...context, ...middlewareContext };
  }
  const currentSegment = routeSegments[currentDepth + 1] ?? "";

  const getChildLayout = (): ReactNode => {
    if (!config.child || !currentSegment) {
      return null;
    }

    let childConfig = config.child[currentSegment] ?? config.child["*"];

    if (!childConfig) {
      const multiRoute = normalizeMultiPathSegments(
        config.child,
        routeSegments,
        currentDepth + 1
      );

      childConfig = config.child[multiRoute ?? ""];

      if (!childConfig) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `No child route found for path: ${routeSegments.join("/")}`
          );
        }
        return config.notfound ?? <div>Not Found</div>;
      }
    }

    const layout = renderLayout(childConfig, {
      routeSegments,
      currentDepth: currentDepth + 1,
      params: childConfig.name
        ? { ...params, [childConfig.name]: currentSegment }
        : params,
      context,
    });

    // Cek apakah layout mengandung lazy component
    if (isLazyComponent(childConfig.layout)) {
      return (
        <Suspense fallback={childConfig?.loading ?? <div>Loading...</div>}>
          {layout}
        </Suspense>
      );
    }

    return layout;
  };

  const MemoizedOutlet = useCallback(() => {
    const childLayout = getChildLayout();
    return childLayout;
  }, [routeSegments, currentDepth]);

  const props: RouteProps = {
    Outlet: MemoizedOutlet,
    param: params,
    context,
  };

  return createElement(config.layout, props);
};
