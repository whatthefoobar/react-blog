import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // null so the auth that allows access to certain routes works
  isFetching: false,
  error: false,
};

// example user from localStorage:
// {
//     "_id": "6670627e0676564bf84e4da7",
//     "username": "jane",
//     "email": "jane@example.com",
//     "profilePic": "11.jpeg",
//     "createdAt": "2024-06-17T16:21:18.922Z",
//     "updatedAt": "2024-06-17T16:23:43.614Z",
//     "__v": 0
// }

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const { user, isFetching, error } = state;

  useEffect(() => {
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
