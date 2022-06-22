import React , {useState} from "react";

export function Tabs({ children }) {
  const childrenArray = React.Children.toArray(children);
  const [current, setCurrent]= useState(childrenArray[0].key)
  const newChildren = childrenArray.map(child => {
    return React.cloneElement(child, {selected : child.key === current})
  })
  return (
    <div className="m-3 ">
      <nav className="nav ">
        {childrenArray.map((child) => (
          <li key={child.key} className="nav-link">
            <button onClick={() => setCurrent(child.key)} className="text-decoration-none bg-light border-0 bg-opacity-10">
              {child.props.title}
            </button>
          </li>
        ))}
      </nav>
      <section>{newChildren}</section>
    </div>
  );
}

export function Tab({ children, selected }) {
  return <div className="p-2 mx-auto text-center pt-3" hidden={!selected} >{children}</div>;
}
