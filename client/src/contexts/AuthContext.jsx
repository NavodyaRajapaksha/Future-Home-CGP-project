import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("fh_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
  console.log("Saving user:", userData);

  setUser(userData);
  localStorage.setItem("fh_user", JSON.stringify(userData));
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fh_user");
  };

  const value = useMemo(() => ({
    user,
    login,
    logout
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(){
  return useContext(AuthContext);
}
