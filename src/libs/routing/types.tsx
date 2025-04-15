import { ReactNode } from "react";

export type RouteConfig = {
  layout: (props: {
    Outlet: () => ReactNode;
    param?: Record<string, string>;
  }) => ReactNode;
  notfound: React.ReactNode;
  default: React.ReactNode;
  error: React.ReactNode;
  name?: string;
  child?: Record<string, RouteConfig>;
};

export type Config = {
  route: Record<string, RouteConfig>;
  notfound: React.ReactNode;
  default: React.ReactNode;
  error: React.ReactNode;
};
