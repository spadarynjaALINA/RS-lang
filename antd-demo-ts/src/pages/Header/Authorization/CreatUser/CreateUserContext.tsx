import React, { useContext, useState } from "react";

interface ICreateUser {
 visibleCreateUser: boolean,
  toggleCreateUser: () => void
}
interface IChild {
 children:JSX.Element
}

const CreateUserContext = React.createContext({} as ICreateUser )
export const useCreateUser = () => {
 return useContext(CreateUserContext)
}

export const CreateUserProvider = ({ children }:IChild) => {
 const [CreateUser, setCreateUser] = useState(false)
  const toggleCreateUser = () => setCreateUser(prev => {
    console.log("togglecreate")
    return !prev
  })
 return (
  <CreateUserContext.Provider value={{
   visibleCreateUser: CreateUser,
   toggleCreateUser
  }}>
   {children}
  </CreateUserContext.Provider>
 )
}