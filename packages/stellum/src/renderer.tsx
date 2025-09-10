import { type ReactNode, Suspense, useCallback, createElement, memo, lazy } from "react";
import type {
  Context,
  Middleware,
  Params,
  RouteConfig,
  RouteContext,
  RouteLayoutOptions,
  RouteProps,
} from "./types";
import { normalizeMultiPathSegments, normalizePath } from "./useRoute";

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
    const LazyLayoutComponent = lazy(async () => {
      const module = await config.lazyLayout!();
      // Support multiple export patterns like React Router v6
      const Component = module.Component || module.default;
      
      if (!Component) {
        throw new Error('Lazy layout must export either Component or default');
      }
      
      return { default: Component };
    });
    
    return (
      <Suspense fallback={config?.loading ?? defaultLayout.loading}>
        {createElement(LazyLayoutComponent, props)}
      </Suspense>
    );
  }

  // Handle regular layout
  if (!config.layout) {
    console.warn('Route config must have either layout or lazyLayout property');
    return defaultLayout.notfound;
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
    params,
    context,
  });

  const mergedContext = { ...context, ...middlewareContext };

  const props = {
    Outlet: () => <></>,
    params: params,
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

const ChildLayout = memo(({
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
  const currentPath = segments[childDepth] ?? "";
  if (!currentPath) {
    return null;
  }

  const currentSegment = normalizePath(currentPath)

  let childConfig = child[currentSegment]

  if (!childConfig) {
    const multiRoute = normalizeMultiPathSegments(child, segments, childDepth);

    childConfig = child[multiRoute ?? "*"];

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
}, (prevProps, nextProps) => {
  if (prevProps.child !== nextProps.child) return false;
  if (prevProps.segments !== nextProps.segments) return false;
  if (prevProps.childDepth !== nextProps.childDepth) return false;
  if (prevProps.notfound !== nextProps.notfound) return false;  
  if (prevProps.defaultLayout !== nextProps.defaultLayout) return false;
  
  const prevContext = prevProps.routeContext;
  const nextContext = nextProps.routeContext;
  
  const prevParams = prevContext.params;
  const nextParams = nextContext.params;
  
  if (Object.keys(prevParams).length !== Object.keys(nextParams).length) return false;
  
  for (const key in prevParams) {
    if (prevParams[key] !== nextParams[key]) return false;
  }
  
  const prevCtx = prevContext.context;
  const nextCtx = nextContext.context;
  
  if (Object.keys(prevCtx).length !== Object.keys(nextCtx).length) return false;
  
  for (const key in prevCtx) {
    if (prevCtx[key] !== nextCtx[key]) return false;
  }
  
  return true;
});
