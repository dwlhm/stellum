import { Suspense, lazy, createElement, type ComponentType } from "react";
import type { LazyRouteFunction, RouteProps } from "../../types";

export const createLazyLayout = (
  lazyLoader: LazyRouteFunction,
  fallback: React.ReactNode
): ComponentType<RouteProps> => {
  const LazyLayoutComponent = lazy(async () => {
    const module = await lazyLoader();
    const Component = module.Component || module.default;

    if (!Component) {
      throw new Error("Lazy layout must export either Component or default");
    }

    return { default: Component };
  });

  const Wrapped = (props: RouteProps) =>
    createElement(
      Suspense as unknown as any,
      { fallback },
      createElement(LazyLayoutComponent, props)
    );

  return Wrapped;
};


