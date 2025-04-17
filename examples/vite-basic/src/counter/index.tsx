import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
};

export default function PageCounter() {
  return (
    <div>
      <h1>Page Counter</h1>
      <Counter />
      <p>Click the button to increment the counter.</p>
    </div>
  );
}
