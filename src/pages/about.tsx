import { ReactNode, useState } from "react";

export default function About({ Outlet, param }: { Outlet: () => ReactNode, param?: Record<string, string> }) {
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <p>Hai</p><p>{JSON.stringify(param)}</p>
      <button onClick={increaseCounter}>{count}</button>
      <Outlet />
    </div>
  );
}
