import {
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import { createContext, useContextSelector } from "use-context-selector";

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

export const RouterContext = createContext<RouterContextType>({
  path: "/",
  navigate: () => {},
});

export const RouterProvider = ({
  children,
  initialPath,
}: {
  children: ReactNode;
  initialPath: string;
}) => {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  }, []);

  const contextValue = useMemo(() => ({ path, navigate }), [path, navigate]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = <T,>(selector: (context: RouterContextType) => T): T => {
  // Use useContextSelector with the context created by use-context-selector
  const context = useContextSelector(RouterContext, selector);

  // Improved error handling if useRouter is used outside RouterProvider
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }

  return context;
};