import {
  ReactNode,
  Suspense,
  useCallback,
  createElement,
} from "react";
import { RouteConfig, RouteProps } from "./types";

interface RenderContext {
  routeSegments: string[];
  currentDepth: number;
  params: Record<string, string>;
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
  { routeSegments, currentDepth, params }: RenderContext
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

    const layout = renderLayout(childConfig, {
      routeSegments,
      currentDepth: currentDepth + 1,
      params: childConfig.name
      ? { ...params, [childConfig.name]: currentSegment }
      : params,
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
  };

  return createElement(config.layout, props);
};
