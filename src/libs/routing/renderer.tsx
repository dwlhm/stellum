import { ReactNode, useMemo } from "react";
import { RouteConfig } from "./types";

interface RenderContext {
  routeSegments: string[];
  currentDepth: number;
}

export const renderLayout = (
  config: RouteConfig,
  { routeSegments, currentDepth }: RenderContext
): ReactNode => {
  const currentSegment = routeSegments[currentDepth + 1] ?? "";
  
  const getChildLayout = (): ReactNode => {
    if (!config.child || !currentSegment) {
      return null;
    }

    const childConfig = config.child[currentSegment] ?? config.child["*"];
    
    if (!childConfig) {
      return config.notfound ?? <div>Not Found</div>;
    }

    return renderLayout(childConfig, {
      routeSegments,
      currentDepth: currentDepth + 1
    });
  };

  // Memoize child layout
  const MemoizedOutlet = useMemo(() => {
    const childLayout = getChildLayout();
    return () => childLayout;
  }, [routeSegments, currentDepth]); // Dependencies yang benar-benar mempengaruhi routing

  return config.layout({
    Outlet: MemoizedOutlet,
    param: config.name ? { [config.name]: routeSegments[currentDepth] } : {}
  });
};
