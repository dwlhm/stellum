import { ReactNode } from "react";

export type RoutesDataType = {
  params: string[];
  position: number;
  config: RouteConfigType;
  currentConfig?: RouteConfigType;
};

export type RouteConfigType = Record<
  string,
  {
    layout: ReactNode;
    child?: RouteConfigType;
  }
>;
