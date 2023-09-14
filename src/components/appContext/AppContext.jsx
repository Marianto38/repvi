import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState(''); // Agregar estado para la búsqueda

 
 
  return (
    <AppContext.Provider value={{
        searchValue,
         setSearchValue     
     
    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };