import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from "react-toastify";

import { api } from "@/services/apiCliente";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signup: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@token");
    Router.push("/");
  } catch {
    console.log("Erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@token": token } = parseCookies();

    if (token) {
      api
        .get("/logged-user")
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signup({ email, password }: SignInProps) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@token", token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      setCookie(undefined, "@name", name);

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success(`Bem vindo, ${name}`);

      Router.push("/requests");
    } catch (err) {
      toast.error("Erro ao autenticar!");
      console.log("Erro ao acessar", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
