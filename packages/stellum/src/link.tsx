import type { ReactNode } from "react";
import { memo } from "react";
import { useRouter } from "./context";

const arePropsEqual = (prevProps: { to: string; children: ReactNode }, nextProps: { to: string; children: ReactNode }) => {
  return prevProps.to === nextProps.to && prevProps.children === nextProps.children;
};

export const Link = memo(({ to, children }: { to: string; children: ReactNode }) => {
  const navigate = useRouter(context => context.navigate);

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}, arePropsEqual);
