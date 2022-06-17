import React, { useCallback, useLayoutEffect, useState, useRef } from "react";
import { render } from "react-dom";

function wait(duration) {
  const t = Date.now();
  while (true) {
    return Date.now() - t > duration ?? true;
  }
}
function App() {
  const [count, setCount] = useState(0);
  const button = useRef(null)

  const increment = useCallback(() => setCount((c) => c + 1), []);

  useLayoutEffect(()=>{
    button.current.style.color =  (count%2 === 0 ) ? 'red' : 'green'
  }, [count])


  return (
    <div className="m-5 ">
      <button onClick={increment} ref={button} className="btn btn-light border-primary">Incrémenter {count} </button>
    </div>
  );
}

render(<App />, document.getElementById("app"));
