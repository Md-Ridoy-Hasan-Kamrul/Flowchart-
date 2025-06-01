import { useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [dbUser, ] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // start with true during initial auth check

  // Create user function
  const createUser = async (email, password) => {
    setIsLoading(true); // Start loading
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } finally {
      setIsLoading(false); // Stop loading after operation completes or fails
    }
  };

  // Sign in function
  const signInUser = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  // Log out function
  const logOutUser = async () => {
    setIsLoading(true);
    try {
      Cookies.remove("core");
      queryClient.clear();
      setRole(null);
      setUser(null);
      await signOut(auth);
    } finally {
      setIsLoading(false);
    }
  };

  // onAuthStateChanged listener to track auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // You can fetch additional user info or roles here if needed
      } else {
        setUser(null);
        setRole(null);
      }
      setIsLoading(false); // Auth state resolved, stop loading
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    dbUser,
    isLoading,
    setIsLoading,
    createUser,
    signInUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
