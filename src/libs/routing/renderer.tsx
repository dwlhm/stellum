import { ReactNode } from "react";
import { RouteConfig } from "./types";

export const renderLayout = (
  config: RouteConfig,
  path: string[],
  position: number
): ReactNode => {
  const childPath = path[position + 1] || "";
  console.log("childPath", childPath, path[position], config);
  let childLayout: ReactNode = <></>;
  if (config.child && childPath !== "") {
    if (config.child[childPath] === undefined && !config.child["*"]) {
      childLayout = config.notfound;
    } else {
      childLayout = renderLayout(
        config.child[childPath] || config.child["*"],
        path,
        position + 1
      );
    }
  }

  return config.layout({
    Outlet: () => childLayout,
    param: { [config.name || ""]: path[position] },
  });
};
