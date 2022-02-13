import React, { useContext, useState } from "react";

interface ILogin {
 visibleLogin: boolean,
  toggleLogin: () => void
}
const LoginContext = React.createContext({} as ILogin )
export const useLogin = () => {
 return useContext(LoginContext)
}
interface IChild {
 children:JSX.Element
}
export const LoginProvider = ({ children }:IChild) => {
 const [login, setLogin] = useState(false)
 const toggleLogin = () => setLogin(prev => !prev)
 return (
  <LoginContext.Provider value={{
   visibleLogin: login,
   toggleLogin
  }}>
   {children}
  </LoginContext.Provider>
 )
}