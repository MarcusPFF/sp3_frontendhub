import { createContext, useState, useContext } from "react";
import facade from "../apiFacade";

const AuthContext = createContext(null);

export const Auth = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => facade.loggedIn());

  const [user, setUser] = useState(() => {
    if (facade.loggedIn()) {
      const [username, roles] = facade.getUserNameAndRoles();
      return { username, roles };
    }
    return { username: "", roles: [] };
  });

  const login = async (username, password) => {
    await facade.login(username, password);

    const [tokenUsername, roles] = facade.getUserNameAndRoles();

    setUser({ username: tokenUsername, roles: roles });
    setIsLoggedIn(true);
  };

  const logout = () => {
    facade.logout();
    setUser({ username: "", roles: [] });
    setIsLoggedIn(false);
  };

  const value = { user, isLoggedIn, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
//kommentar der fjerner react refresh warning
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
