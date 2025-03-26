// src/libs/route/outlet.tsx

import { getLayout } from "./layout";
import { data } from "./routes";

export const Outlet = () => {
  let path = data.params[data.position];
  if (!path) return;
  return getLayout();
};
