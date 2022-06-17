import React, { useState, useEffect } from "react";
import { render } from "react-dom";

const useIncrement = (initial, step)=>{
  const [count, setCount] = useState(initial)
  const increment = ()=>{
    setCount(c => c+step)
  }
  return [count, increment]
}

function Compteur() {
  const [count, increment] = useIncrement(0,2);

  useEffect(()=>{
    const timer= window.setInterval(()=>{
      increment()
    }, 1000)
    return function(){
      clearInterval(timer)
    }
  }, [])

  useEffect(()=>{
    document.title = "Compteur" + count 
  }, [count])


  return <button onClick={increment}>Incrémenter {count}</button>
}
render(
  <div>
    <Compteur />
  </div>,
  document.getElementById("app")
);

// window.setTimeout(()=>{
//   render(
//     <div>
//       bonjour
//     </div>,
//     document.getElementById("app")
//   );
// }, 2000)
