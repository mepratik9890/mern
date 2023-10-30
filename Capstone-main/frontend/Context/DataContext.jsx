import { createContext, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
  const [auth, setAuth] = useState("");
  const [search , setSearch] = useState('')
  return (
    <DataContext.Provider
      value={{
        auth,
        setAuth,
        search , 
        setSearch
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
