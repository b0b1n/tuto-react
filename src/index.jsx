import React, { useRef } from "react";
import { render } from "react-dom";

function App() {

  const input = useRef(null)
  const compteur = useRef({count : 0})


  const handleButtonClick = function(){
    compteur.current.count++
    console.log(compteur);
  }

  return <div className="m-5 ">
    <input type="text" className="m-5" ref={input}/>
    <button className="m-5 rounded ps-2 pe-2" onClick={handleButtonClick}>Récuperer la valeur </button>
  </div>
}

render(<App />, document.getElementById("app"));
