import type { ReactNode } from "react";
import { useRouter } from "./context";

export const Link = ({ to, children }: { to: string; children: ReactNode }) => {
  const { navigate } = useRouter();

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
};
