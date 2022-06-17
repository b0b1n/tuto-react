import React, { useEffect, useState } from "react";
import { render } from "react-dom";

function useIncrement(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = function () {
    setCount((c) => c + 1);
  };
  return [count, increment];
}

function useToggle(initialValue = true) {
  const [value, setValue] = useState(initialValue);
  const toggle = function () {
    setValue((v) => !v);
  };
  return [value, toggle];
}

function useAutoIncrement(initialValue = 0, step = 1) {
  const [count, increment] = useIncrement(initialValue, step);

  useEffect(function () {
    const timer = window.setInterval(function () {
      increment();
    }, 1000);

    return function () {
      window.clearInterval(timer);
    };
  }, []);
  return count;
}

function Compteur() {
  const count = useAutoIncrement(0, 10);

  return <button>Incrémenter {count}</button>;
}

function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });
  useEffect(function () {
    (async function () {
      const response = await fetch(url);
      const responseData = await response.json();
      if (response.ok) {
        setState({ items: responseData, loading: false });
      } else {
        alert(JSON.stringify(responseData));
        setState((s) => ({ ...s, loading: false }));
      }
    })();
  }, []);
  return [state.loading, state.items];
}

function App() {
  const [compteurVisible, toggleCompteur] = useToggle(true);

  return (
    <div>
      Afficher le compteur{" "}
      <input
        type="checkbox"
        onChange={toggleCompteur}
        checked={compteurVisible}
      />
      <br />
      {compteurVisible && <Compteur />}
      <TodoList />
      <PostTable />
    </div>
  );
}
function TodoList() {
  const [loading, items] = useFetch("https://jsonplaceholder.typicode.com/todos?_limit=20")

  if (loading) {
    return "Chargement .....";
  }

  return (
    <ul>
      {items.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}
function PostTable() {
  const [loading, items ] = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=15")

  if (loading) {
    return "Chargement .....";
  }

  return (
    <div className="container mt-2">
      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col " className="text-center">
              title
            </th>
            <th scope="col " className="text-center">
              body
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t.id}>
              <td className="text-center">{t.title}</td>
              <td className="text-center">{t.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// function PostTable() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(function () {
//     (async function () {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts?_limit=15"
//       );
//       const responseData = await response.json();
//       if (response.ok) {
//         setPosts(responseData);
//       } else {
//         alert(JSON.stringify(responseData));
//       }
//       setLoading(false);
//     })();
//   }, []);

//   if (loading) {
//     return "Chargement .....";
//   }

//   return (
//     <div className="container mt-2">
//       <table className="table table-light table-striped">
//         <thead>
//           <tr>
//             <th scope="col " className="text-center">
//               title
//             </th>
//             <th scope="col " className="text-center">
//               body
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.map((t) => (
//             <tr key={t}>
//               <td className="text-center">{t.title}</td>
//               <td className="text-center">{t.body}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(function () {
//     (async function () {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/todos?_limit=20"
//       );
//       const responseData = await response.json();
//       if (response.ok) {
//         setTodos(responseData);
//       } else {
//         alert(JSON.stringify(responseData));
//       }
//       setLoading(false);
//     })();
//   }, []);

//   if (loading) {
//     return "Chargement .....";
//   }

//   return (
//     <ul>
//       {todos.map((t) => (
//         <li key={t.id}>{t.title}</li>
//       ))}
//     </ul>
//   );
// }

render(<App />, document.getElementById("app"));
