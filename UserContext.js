import React, {
  createContext,
  useState,
  useContext,
} from 'react';

const UserContext = createContext();

export const useAuthData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  return (
    <UserContext.Provider
      value={{
        favourites,
        setFavourites,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;