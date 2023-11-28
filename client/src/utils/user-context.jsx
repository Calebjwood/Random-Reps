import { createContext, useContext, useEffect, useState } from "react";
import {  QUERY_ME} from "./queries";
import { useQuery } from "@apollo/client";

const userContext = createContext() 
export const useUserContext = () => useContext(userContext)

export const UserProvider = ({children}) => {
  const { data, loading } = useQuery(QUERY_ME)
  return(
    <userContext.Provider value={{me:data?.me, loading}}>
      {children}
    </userContext.Provider>
  )
}
export default UserProvider