import { ReactNode, ComponentType } from "react";

export interface RouteProps {
  Outlet: () => ReactNode;
  param?: Record<string, string>;
}

export type RouteConfig = {
  layout: ComponentType<RouteProps>;
  notfound: React.ReactNode;
  loading?: React.ReactNode;
  name?: string;
  child?: Record<string, RouteConfig>;
};

export type Config = {
  route: Record<string, RouteConfig>;
  notfound: React.ReactNode;
  loading?: React.ReactNode;
};
