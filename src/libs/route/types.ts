export type RoutesDataType = {
  params: string[];
  position: number;
  config: RouteConfigType;
  currentConfig?: RouteConfigType;
  currentParam?: Record<string, any>;
};

export type RouteConfigType = Record<
  string,
  {
    layout: React.JSX.Element;
    child?: RouteConfigType;
    params?: (param: string) => unknown;
  }
>;
