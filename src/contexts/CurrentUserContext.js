import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUSer] = useState(null);

    const handleMount = async () => {
      try {
        const { data } = await axios.get("dj-rest-auth/user/");
        setCurrentUSer(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      handleMount();
    }, []);

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider
          value={setCurrentUSer}
        >
            {children}
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    );
}