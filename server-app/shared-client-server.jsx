import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { EncaseStore } from "../pages/EncaseStore";

const ROOT_ELEMENT_ID = "page-view";

function serverVarsToClient() {
  const passToClient = [
    "pageProps", // automatic sharing
    "routeParams", // automatic sharing
    "url",
    "G_TYPE_CZECH_ON",
    "G_TYPE_CZECH_OPTIONS",
  ];
  return passToClient;
}

function sharedClientServer(server_variables) {
  return <EncaseStore server_variables={server_variables}></EncaseStore>;
}

function serverRender(server_variables) {
  const shared_client_server = sharedClientServer(server_variables);
  const server_html = ReactDOMServer.renderToString(shared_client_server);
  return server_html;
}

function clientRender(server_variables, root_element_id) {
  const shared_client_server = sharedClientServer(server_variables);
  const root_elem = document.getElementById(root_element_id);
  ReactDOM.hydrate(shared_client_server, root_elem);
}

export { serverRender, clientRender, serverVarsToClient, ROOT_ELEMENT_ID };
