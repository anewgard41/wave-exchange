import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_ME } from "./utils/queries";
import Auth from "./utils/auth";

const UserStoreContext = createContext();

export const UserStore = ({ children }) => {
  const state = useState({});
  return (
    <UserStoreContext.Provider value={state}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserData = () => {
  const [userData, setUserData] = useContext(UserStoreContext);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, error, data, refetch } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    skip: !token
  });
  useEffect(() => {
    setUserData(data?.me ?? {});
  }, [data, setUserData]);
  return {
    data: userData,
    refetch
  };
}