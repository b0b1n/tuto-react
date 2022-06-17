import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { render } from "react-dom";

const FormContext = createContext({});

function FormWithContext({ defaultValue, onSubmit, children }) {
  const [data, setData] = useState(defaultValue);
  const change = useCallback(function (name, value) {
    setData((d) => ({ ...data, [name]: value }));
  });
  const value = useMemo(() => {
    return { ...data, change };
  }, [data, change]);

  const handleSubmit = useCallback(function(e){
    e.preventDefault()
    onSubmit(value)
  }, [onSubmit, value])
  return (
    <FormContext.Provider value={value}>
      <form onSubmit={handleSubmit} className="mt-5">{children}</form>
      {JSON.stringify(value)}
    </FormContext.Provider>
  );
}

function FormField({ name, children }) {
  const data = useContext(FormContext);
  const handleChange = useCallback(
    function (e) {
      data.change(e.target.name, e.target.value);
    },
    [data.change]
  );

  return (
    <div className="form-group">
      <label htmlFor={name}>{children}</label>
      <input
        type="text"
        name={name}
        id={name}
        className="form-control"
        value={data[name] || ""} 
        onChange={handleChange}
      />
    </div>
  );
}

function PrimaryButton({ children }) {
  return <button className="btn btn-primary mt-3">{children}</button>;
}

function App() {
  const handleSubmit = useCallback(function (value) {
    console.log(value);
  }, []);

  return (
    <div className="container">
      <FormWithContext
        defaultValue={{ name: "Doe", firstname: "John" }}
        onSubmit={handleSubmit}
      >
        <FormField name="firstname">Prénom</FormField>
        <FormField name="name">Nom</FormField>
        <PrimaryButton>Envoyer</PrimaryButton>
      </FormWithContext>
    </div>
  );
}
render(<App />, document.getElementById("app"));
