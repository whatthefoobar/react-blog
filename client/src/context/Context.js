import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // null so the auth that allows access to certain routes works
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const { user, isFetching, error } = state;

  useEffect(() => {
    console.log(user);

    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Context.Provider
      value={{
        user: user,
        isFetching: isFetching,
        error: error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
