import { ReactNode } from "react";
import { Config } from "./types";
import { renderLayout } from "./renderer";

export const useRoute = (initialConfig: Config, currentPath: string) => {
  let splitPath = currentPath.split("/");
  if (splitPath[0] === "") splitPath = ["/"];

  return {
    Route: (): ReactNode => {
      return (
        renderLayout(initialConfig.route[splitPath[0]], splitPath, 0) ||
        initialConfig.notfound
      );
    },
  };
};
