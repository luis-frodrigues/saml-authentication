import { Amplify, Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AwsConfigAuth } from "../config/auth.tsx";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

Amplify.configure({
  Auth: AwsConfigAuth,
});

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
  user: any;
  signIn: (username: string, password: string) => Promise<Result>;
  federatedSignIn: (username: string, password: string) => Promise<Result>;
  signOut: () => void;
}

interface Result {
  success: boolean;
  message: string;
}

type Props = {
  children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setUsername(result.username);
        setUser(result);
        setIsAuthenticated(true);
        setIsLoading(false);
        console.log(result);
      })
      .catch(() => {
        setUsername("");
        setUser("");
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const result = await Auth.signIn(username, password);
      setUser(result);
      setUsername(result.username);
      setIsAuthenticated(true);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "LOGIN FAIL",
      };
    }
  };

  const federatedSignIn = async (username: string, password: string) => {
    try {
      const result = await Auth.federatedSignIn({
        customProvider: "NOVA-SAML2",
      });
      console.log(result);

      //setUser(result);
      //setUsername(result.username);
      setIsAuthenticated(true);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "LOGIN FAIL",
      };
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser("");
      setUsername("");
      setIsAuthenticated(false);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "LOGOUT FAIL",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    user,
    signIn,
    signOut,
    federatedSignIn,
  };
};
