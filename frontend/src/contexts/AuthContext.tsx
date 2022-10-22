import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
  children: JSX.Element;
}

interface Auth {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialData: any = {};

export const AuthContext = createContext<Auth>(initialData);

export const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
