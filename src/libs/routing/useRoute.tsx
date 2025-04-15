import { ReactNode, useMemo } from "react";
import { Config } from "./types";
import { renderLayout } from "./renderer";

const normalizePathSegments = (path: string): string[] => {
  const segments = path.split('/').filter(Boolean);
  return segments.length ? segments : ['/'];
};

// Component yang stabil
const RouteRenderer = ({ 
  config, 
  segments 
}: { 
  config: Config, 
  segments: string[] 
}) => {
  console.log('dicall lagi', segments);
  const rootRoute = config.route[segments[0]];
  
  if (!rootRoute) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`No route found for path: ${segments[0]}`);
    }
    return config.notfound;
  }

  try {
    return renderLayout(rootRoute, {
      routeSegments: segments,
      currentDepth: 0
    });
  } catch (error) {
    console.error('Route rendering failed:', error);
    return config.notfound;
  }
};

export const useRouter = (config: Config, path: string) => {
  // Memoize path segments
  const segments = useMemo(() => normalizePathSegments(path), [path]);
  
  // Memoize component dengan dependencies yang stabil
  return useMemo(() => {
    return () => <RouteRenderer config={config} segments={segments} />;
  }, [config, segments]);
};
