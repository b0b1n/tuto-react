import React, { useReducer } from "react";
import { render } from "react-dom";

function init(initialValue){
    return {count : initialValue}
}

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {count : state.count + (action.payload || 1)};
    case "decrement":
      return state.count <= 0 ? state : {count : state.count - (action.payload || 1)};
    case "Reset":
      return init(0)  

    default:
      throw new Error("L'action " + action.type + "est inconnue ");
  }
}
function Child(){
  console.log("rendering");
  return <div>Hello</div>
}
function App() {

  const [count , dispatch] = useReducer(reducer, 0, init)


  return (
    <div className="m-5 ">
      Compteur   :  {JSON.stringify(count)}
      <button onClick={() => dispatch({type: 'increment' , payload : 10})}>Incrémenter</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Décrémenter</button>
      <button onClick={() => dispatch({type: 'Reset'})}>Réinitialiser</button>
      <Child />
    </div>
  );
}

render(<App />, document.getElementById("app"));