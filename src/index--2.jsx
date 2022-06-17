import React, { createContext, useCallback, useContext , useMemo, useState} from "react";
import { render } from "react-dom";

const THEMES = {
  dark: {
    background: "#000",
    color: "#FFF",
    border: "solid 1px #FFF",
  },
  light: {
    background: "#FFF",
    color: "#000",
    border: "solid 1px #000",
  },
};

const ThemeContext = createContext({
  theme : THEMES.dark,
  toggleTheme: ()=>{}
});

function SearchForm() {
  return (
    <div>
      <input />
      <ThemedButtonClass>Rechercher</ThemedButtonClass>
    </div>
  );
}
function Toolbar() {
  return (
    <div>
      <SearchForm />
      <ThemedButton>M'inscrire</ThemedButton>
    </div>
  );
}

function ThemedButton({ children }) {
  const {theme} = useContext(ThemeContext);
  return <button style={theme}>{children}</button>;
}
class ThemedButtonClass extends React.Component {
  render() {
    const { children } = this.props;
    const {theme} = this.context
    return (
      <ThemeContext.Consumer>
        {(value) => {
          return <button style={theme}>{children}</button>;
        }}
      </ThemeContext.Consumer>
    );
  }
}

ThemedButtonClass.contextType = ThemeContext

function App() {
  const [theme, setTheme] = useState("light")
  const toggleTheme = useCallback(function(){
    setTheme(t => t==='light'  ? 'dark' : 'light')
  }, [])

 //const currentTheme = 
  const value = useMemo(function(){
    return {
      theme : theme === 'light' ? THEMES.light : THEMES.dark,
      toggleTheme
    }
  }, [toggleTheme, theme])
  
  return (
    <div className="m-5 ">
      <ThemeContext.Provider value={value}>
        <Toolbar />
        <ThemeSwitcher />
      </ThemeContext.Provider>

    </div>
  );
}

function ThemeSwitcher(){
  const {toggleTheme} = useContext(ThemeContext)
  return <button onClick={toggleTheme}> Changer le theme</button>
}

render(<App />, document.getElementById("app"));
