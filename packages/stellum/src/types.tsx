import type { ReactNode, LazyExoticComponent } from "react";

export type Params = Record<string, string>;
export type Context = Record<string, unknown>;
export type LayoutFunction = (props: RouteProps) => ReactNode;

export type RouteContext = {
  params: Params;
  context: Context;
};

export type MiddlewareContext = {
  params?: Params;
  context: Record<string, unknown>;
};

export interface RouteProps extends Partial<RouteContext> {
  Outlet: () => ReactNode;
}

export type Middleware = (context: MiddlewareContext) => {
  MiddlewareComponent?: LayoutFunction;
  context: Record<string, unknown>;
};

export type RouteLayoutOptions = {
  notfound: React.ReactNode;
  loading: React.ReactNode;
};

export type LazyLayoutFunction = () => Promise<{ default: LayoutFunction }>;

// Support multiple lazy properties like React Router v6
export type LazyRouteModule = {
  Component?: LayoutFunction;
  default?: LayoutFunction;
  loader?: any;
  action?: any;
  ErrorBoundary?: React.ComponentType;
};

export type LazyRouteFunction = () => Promise<LazyRouteModule>;

export type RouteConfig = {
  layout?: LayoutFunction;           // Regular layout component
  lazyLayout?: LazyRouteFunction;   // Lazy layout component (replaces layout)
  name?: string;
  child?: Record<string, RouteConfig>;
  middleware?: Middleware;
} & Partial<RouteLayoutOptions>;

export type Config = {
  route: Record<string, RouteConfig>;
  middleware?: (context: MiddlewareContext) => LayoutFunction;
} & RouteLayoutOptions;
