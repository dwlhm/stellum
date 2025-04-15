import { ReactNode, ComponentType } from "react";

export interface RouteProps {
  Outlet: () => ReactNode;
  param?: Record<string, string>;
}

export type RouteConfig = {
  layout: ComponentType<RouteProps>;
  notfound: React.ReactNode;
  default: React.ReactNode;
  error: React.ReactNode;
  loading?: React.ReactNode;
  name?: string;
  child?: Record<string, RouteConfig>;
};

export type Config = {
  route: Record<string, RouteConfig>;
  notfound: React.ReactNode;
  default: React.ReactNode;
  loading?: React.ReactNode;
  error: React.ReactNode;
};
