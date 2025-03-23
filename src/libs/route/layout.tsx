// src/libs/route/layout.tsx

import { data } from "./routes";

export const getLayout = () => {
  let path = data.params[data.position];

  const config = data.currentConfig ? data.currentConfig : data.config;
  if (path === "" || !path) {
    path = "/";
  }
  
  if (!config[path]) {
    return <h1>Not Found</h1>;
  }
  data.position += 1;
  const layout = config[path].layout;
  data.currentConfig = config[path].child;
  return layout;
};
