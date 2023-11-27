import { createContext, useContext, useEffect, useState } from "react";
import { QUERY_USER } from "./queries";
import { useQuery } from "@apollo/client";

const userContext = createContext() 
export const useUserContext = () => useContext(userContext)

export const UserProvider = ({children}) => {
  const { data, loading } = useQuery(QUERY_USER)
  return(
    <userContext.Provider value={{user:data?.user, loading}}>
      {children}
    </userContext.Provider>
  )
}
export default UserProvider