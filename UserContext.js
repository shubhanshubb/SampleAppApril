import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [loggedInUser, setLoggedInUser] = useState(null);

  const userData = async () => {
    try {
      const user = await AsyncStorage.getItem('userData');
      if (user) {
        setLoggedInUser(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  useEffect(() => {
    userData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        favourites,
        setFavourites,
        loggedInUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;