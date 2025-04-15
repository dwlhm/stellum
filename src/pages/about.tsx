import { ReactNode, useState } from "react";
import { Link } from "../libs/routing/link";

export default function About({
  Outlet,
}: {
  Outlet: () => ReactNode;
  param?: Record<string, string>;
}) {
  return (
    <div>
      <p>Hai</p>
      <Link to="/">Homea</Link>
      <Link to="/about/dwlhm">About me</Link>
      <Link to="/about/dwlhm/logout">Logout</Link>
      <Counter />
      <Outlet />
    </div>
  );
}

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    setCount((prev) => prev + 1);
  };

  return <button onClick={increaseCounter}>{count}</button>;
};
