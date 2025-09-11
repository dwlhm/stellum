import { createElement } from "react";
import type { Context, Middleware, Params, RouteProps } from "../types";

export const executeMiddleware = ({
  middleware,
  params,
  context,
}: {
  middleware?: Middleware;
  params: Params;
  context: Context;
}) => {
  if (!middleware) return null;
  const { MiddlewareComponent, context: middlewareContext } = middleware({
    params,
    context,
  });

  const mergedContext = { ...context, ...middlewareContext };

  const props: RouteProps = {
    Outlet: () => null,
    params: params,
    context: mergedContext,
  };

  const Layout = MiddlewareComponent
    ? createElement(MiddlewareComponent, props)
    : null;

  return {
    Layout: Layout,
    context: mergedContext,
  };
};


