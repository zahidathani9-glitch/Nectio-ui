import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user] = useState<any>(null);
  const [loading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};