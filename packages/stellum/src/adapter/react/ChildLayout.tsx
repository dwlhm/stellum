import { memo, type ReactNode } from "react";
import type { RouteConfig, RouteContext, RouteLayoutOptions } from "../../types";
import { normalizeMultiPathSegments, normalizePath } from "../../useRoute";
import { renderLayout } from "../../renderer";

export const ChildLayout = memo(({
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


