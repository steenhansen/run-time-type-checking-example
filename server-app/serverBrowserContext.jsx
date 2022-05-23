import React, { useContext } from "react";

export { ServerContextProvider, useServerContext };

const Server_Context = React.createContext("server-context");

function ServerContextProvider({ server_variables, children }) {
  return <Server_Context.Provider value={server_variables}>{children}</Server_Context.Provider>;
}

function useServerContext() {
  const server_variables = useContext(Server_Context);
  return server_variables;
}
