// src/libs/routes/routes.tsx

import { RouteConfigType, RoutesDataType } from "./types";
import { getLayout } from "./layout";

export let data: RoutesDataType = {
  params: [],
  position: 0,
  config: {},
};

export const Routes = ({
  initialParams,
  initialConfig,
}: {
  initialParams: string;
  initialConfig: RouteConfigType;
}) => {
  data = {
    params: initialParams.split("/"),
    position: 0,
    config: initialConfig,
  };

  return getLayout();
};
