import React from "react";
 
interface AppContextInterface {
   showModal: (v:number) => void;
}

interface AppContextInterface2 {
   showModal1: () => void;
}
const Context = React.createContext({} as AppContextInterface)
 //const Context = React.createContext<ContextProps | null>(null) as React.Context<ContextProps>;



const Context2 = React.createContext({} as AppContextInterface2)
export default Context;
export {Context2}