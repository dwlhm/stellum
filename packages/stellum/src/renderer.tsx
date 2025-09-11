import { type ReactNode, useCallback, createElement } from "react";
import type {
  RouteConfig,
  RouteLayoutOptions,
  RouteProps,
} from "./types";
import { executeMiddleware } from "./core/middleware";
import { ChildLayout } from "./adapter/react/ChildLayout";
import { createLazyLayout } from "./adapter/react/lazyLayout";

interface RenderContext {
  routeSegments: string[];
  currentDepth: number;
  params: Record<string, string>;
  context: Record<string, unknown>;
  defaultLayout: RouteLayoutOptions;
}

export const renderLayout = (
  config: RouteConfig,
  { routeSegments, currentDepth, params, context, defaultLayout }: RenderContext
): ReactNode => {
  const middlewareResult = executeMiddleware({
    middleware: config.middleware,
    params,
    context,
  });

  const middlewareLayoutElement = middlewareResult?.Layout ?? null;
  const effectiveContext = middlewareResult?.context ?? context;

  if (middlewareLayoutElement) {
    return middlewareLayoutElement;
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
          context: effectiveContext,
        }}
        defaultLayout={defaultLayout}
      />
    ) : null;
  }, [config.child, routeSegments, currentDepth, config.notfound, defaultLayout, params, effectiveContext]);

  const props: RouteProps = {
    Outlet: MemoizedOutlet,
    params: params,
    context: effectiveContext,
  };

  // Handle lazy layout (takes precedence over regular layout)
  if (config.lazyLayout) {
    const LazyLayoutComponent = createLazyLayout(
      config.lazyLayout,
      config?.loading ?? defaultLayout.loading
    );
    return createElement(LazyLayoutComponent, props);
  }

  // Handle regular layout
  if (!config.layout) {
    console.warn('Route config must have either layout or lazyLayout property');
    return defaultLayout.notfound;
  }

  return createElement(config.layout, props);
};

// executeMiddleware and ChildLayout moved to adapter/core modules
