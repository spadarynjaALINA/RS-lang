import React from "react";
 
interface AppContextInterface {
   showModal: () => void;
}
const Context = React.createContext({} as AppContextInterface)
 //const Context = React.createContext<ContextProps | null>(null) as React.Context<ContextProps>;
export default Context


