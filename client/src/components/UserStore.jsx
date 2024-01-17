import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

// Create a context for managing user data
const UserStoreContext = createContext();

// UserStore component to provide user data through context
export const UserStore = ({ children }) => {
  const state = useState({});
  return (
    <UserStoreContext.Provider value={state}>
      {children}
    </UserStoreContext.Provider>
  );
};

// Custom hook to access user data and perform queries
export const useUserData = () => {
  // Destructure user data and setUserData from the UserStoreContext
  const [userData, setUserData] = useContext(UserStoreContext);
  // Get the user token from Auth utility
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // Use Apollo Client's useQuery to fetch user data
  const { loading, error, data, refetch } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token, // Skip the query if no token is present
  });

  // Update user data in the context when data changes
  useEffect(() => {
    setUserData(data?.me ?? {});
  }, [data, setUserData]);

  // Return user data and refetch function
  return {
    data: userData,
    refetch,
  };
};
