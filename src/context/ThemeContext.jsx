import { createContext, useReducer } from "react";

// This is the ThemeContext Object (It is done first)
export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };

    default:
      return state;
  }
};

// Next is th ecustom react component
export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "blue",
  });

  const changeColor = (color) => {
    // This is the dispatch action, with two properties (type means the type of state change an the payload means the data we want to base the change on)
    dispatch({ type: "CHANGE_COLOR", payload: color });
  }; 

  return (
    // This means that all the children components, will get access to the ThemeContext.Provider value
    <ThemeContext.Provider value={{ ...state, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
