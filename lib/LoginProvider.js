import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useSessionQuery } from "../lib/queries/auth/useSessionQuery";

const LoginContext = React.createContext({
  isAuthenticated: false,
  currentUser: null,
});

function useCurrentSession() {
  return useContext(LoginContext);
}

export function useCurrentUser() {
  const { currentUser } = useCurrentSession();
  return currentUser;
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useCurrentSession();
  return isAuthenticated;
}

export function useIsAuthenticatedRequired() {
  const router = useRouter();
  const { isAuthenticated } = useCurrentSession();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated;
}

export function withAuthenticationRequired(Component) {
  return (...props) => {
    const isAuthenticated = useIsAuthenticatedRequired();

    return isAuthenticated ? <Component {...props} /> : null;
  };
}

export function LoginProvider({ children }) {
  const { data: currentUser, isLoading } = useSessionQuery();
  const isAuthenticated = !!currentUser;

  if (isLoading) return null;

  return (
    <LoginContext.Provider value={{ isAuthenticated, currentUser }}>
      {children}
    </LoginContext.Provider>
  );
}
