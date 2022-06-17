import React, { useEffect, useState, useMemo, memo, useCallback } from "react";
import { render } from "react-dom";

function wait(duration) {
  const t = Date.now();
  while (true) {
    return Date.now() - t > duration ?? true;
  }
}

const Button = memo(function ({ onClick }) {
  console.log("render");
  return <button onClick={onClick}>Mon boutton</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(function(){alert("Bonjour")}, [count]);
  // const handleClick = useMemo(() => {
  //   return (e) => {
  //     alert("Bonjour");
  //   };

  return (
    <div>
      <Button onClick={handleClick} />
      <button onClick={() => setCount((c) => c + 1)}>
        Incrémenter : {count}
      </button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
