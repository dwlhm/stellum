import { type ReactNode, Suspense, useCallback, createElement } from "react";
import type {
  Context,
  Middleware,
  Params,
  RouteConfig,
  RouteContext,
  RouteLayoutOptions,
  RouteProps,
} from "./types";
import { normalizeMultiPathSegments } from "./useRoute";

interface RenderContext {
  routeSegments: string[];
  currentDepth: number;
  params: Record<string, string>;
  context: Record<string, unknown>;
  defaultLayout: RouteLayoutOptions;
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
  { routeSegments, currentDepth, params, context, defaultLayout }: RenderContext
): ReactNode => {
  const middlewareResult = executeMiddleware({
    middleware: config.middleware,
    params,
    context,
  });

  const MiddlewareLayout = middlewareResult?.Layout ?? null;
  context = middlewareResult?.context ?? context;

  if (MiddlewareLayout) {
    return createElement(() => MiddlewareLayout);
  }

  const MemoizedOutlet = useCallback(() => {
    return config.child ? (
      <ChildLayout
        child={config.child}
        segments={routeSegments}
        childDepth={currentDepth + 1}
        notfound={config.notfound ?? defaultLayout.notfound}
        routeContext={{
          params: params,
          context: context,
        }}
        defaultLayout={defaultLayout}
      />
    ) : null;
  }, [routeSegments, currentDepth]);

  const props: RouteProps = {
    Outlet: MemoizedOutlet,
    params: params,
    context,
  };

  // Cek apakah layout mengandung lazy component
  if (isLazyComponent(config.layout)) {
    return (
      <Suspense fallback={config?.loading ?? defaultLayout.loading}>
        {createElement(config.layout, props)}
      </Suspense>
    );
  }

  return createElement(config.layout, props);
};

const executeMiddleware = ({
  middleware,
  params,
  context,
}: {
  middleware?: Middleware;
  params: Params;
  context: Context;
}) => {
  if (!middleware) return null;
  const { MiddlewareComponent, context: middlewareContext } = middleware({
    context,
  });

  const mergedContext = { ...context, ...middlewareContext };

  const props = {
    Outlet: () => <></>,
    param: params,
    context: mergedContext,
  };

  const Layout = MiddlewareComponent
    ? createElement(MiddlewareComponent, props)
    : null;

  return {
    Layout: Layout,
    context: mergedContext,
  };
};

const ChildLayout = ({
  child,
  segments,
  childDepth,
  notfound = <p>Not Found!</p>,
  routeContext,
  defaultLayout,
}: {
  child: Record<string, RouteConfig>;
  segments: string[];
  childDepth: number;
  notfound?: ReactNode;
  routeContext: RouteContext;
  defaultLayout: RouteLayoutOptions;
}) => {
  const currentSegment = segments[childDepth] ?? "";
  if (!currentSegment) {
    return null;
  }

  let childConfig = child[currentSegment] ?? child["*"];

  if (!childConfig) {
    const multiRoute = normalizeMultiPathSegments(child, segments, childDepth);

    childConfig = child[multiRoute ?? ""];

    if (!childConfig) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`No child route found for path: ${segments.join("/")}`);
      }
      return notfound;
    }
  }

  const mergedRouteContext = {
    ...routeContext,
    params: childConfig.name
      ? { ...routeContext.params, [childConfig.name]: currentSegment }
      : routeContext.params,
  };

  const layout = renderLayout(childConfig, {
    routeSegments: segments,
    currentDepth: childDepth,
    defaultLayout,
    ...mergedRouteContext,
  });

  return layout;
};
