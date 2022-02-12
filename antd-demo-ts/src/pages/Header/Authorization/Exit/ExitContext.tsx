import React, { useContext, useState } from "react";

interface IExit {
 visibleExit: boolean,
  toggleExit: () => void
}
interface IChild {
 children:JSX.Element
}

const ExitContext = React.createContext({} as IExit )
export const useExit = () => {
 return useContext(ExitContext)
}

export const ExitProvider = ({ children }:IChild) => {
 const [Exit, setExit] = useState(false)
  const toggleExit = () => setExit(prev => {
    console.log("togglecreate")
    return !prev
  })
 return (
  <ExitContext.Provider value={{
   visibleExit: Exit,
   toggleExit
  }}>
   {children}
  </ExitContext.Provider>
 )
}