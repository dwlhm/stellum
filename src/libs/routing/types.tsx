import { ReactNode, ComponentType } from "react";

export interface RouteProps {
  Outlet: () => ReactNode;
  param?: Record<string, string>;
  context?: Record<string, unknown>;
}

export type RouteConfig = {
  layout: ComponentType<RouteProps>;
  notfound?: React.ReactNode;
  loading?: React.ReactNode;
  name?: string;
  child?: Record<string, RouteConfig>;
  middleware?: (context: MiddlewareContext) => {
    MiddlewareComponent?: ComponentType<RouteProps>;
    context: Record<string, unknown>;
  };
};

export type MiddlewareContext = {
  context: Record<string, unknown>;
};

export type Config = {
  route: Record<string, RouteConfig>;
  notfound: React.ReactNode;
  loading: React.ReactNode;
  middleware?: (context: MiddlewareContext) => ComponentType<RouteProps>;
};
