import { ReactNode, ComponentType, LazyExoticComponent } from "react";

export type Params = Record<string, string>;
export type Context = Record<string, unknown>;
export type LayoutFunction = (props: RouteProps) => ReactNode;

export type RouteContext = {
  params: Params;
  context: Context;
};

export type MiddlewareContext = {
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

export type RouteConfig = {
  layout: LayoutFunction | LazyExoticComponent<LayoutFunction>;
  name?: string;
  child?: Record<string, RouteConfig>;
  middleware?: Middleware;
} & Partial<RouteLayoutOptions>;

export type Config = {
  route: Record<string, RouteConfig>;
  middleware?: (context: MiddlewareContext) =>LayoutFunction;
} & RouteLayoutOptions;
