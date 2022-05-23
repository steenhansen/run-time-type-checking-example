const { print, herokuEnvOrConfigFile, HTTP_PORT, DEFAULT_CONFIG } = require("../import-2-require/common-2-require");

const { getInputNumber, returnSquareRoot } = require("./square-roots");

global.GLOBAL_CONFIG = DEFAULT_CONFIG;
const prog_root = `${__dirname}/..`;
global.GLOBAL_CONFIG = herokuEnvOrConfigFile(prog_root);

const favicon = require("express-favicon");

const express = require("express");

const { createPageRenderer } = require("vite-plugin-ssr");
const { PageContextInit } = require("./server-to-client-vars");
const isProduction = process.env.NODE_ENV === "production";

var app = express();
startServer(app);

async function prodOrDevServer(app) {
  app.use(express.static("pages/images"));

  const FAVICON_FLATICON = "./pages/czech-flag.png";
  app.use(favicon(FAVICON_FLATICON));

  if (isProduction) {
    app.use(express.static(`${prog_root}/dist/client`));
  } else {
    const vite = require("vite");
    viteDevServer = await vite.createServer({
      root: prog_root,
      server: { middlewareMode: "ssr" },
    });
    app.use(viteDevServer.middlewares);
    return viteDevServer;
  }
}

async function startServer(app) {
  viteDevServer = await prodOrDevServer(app);
  const renderPage = createPageRenderer({
    viteDevServer,
    isProduction,
    root: prog_root,
  });

  app.get("*", async (req, res, next) => {
    if (req.url !== "/") {
      const { number_style, square_root, to_sqrt } = getInputNumber(req);
      returnSquareRoot(number_style, square_root, to_sqrt, res);
    } else {
      var server_variables_init = await PageContextInit(req.originalUrl);
      const server_variables = await renderPage(server_variables_init);
      const { httpResponse } = server_variables;
      if (!httpResponse) return next();
      const { body, statusCode, contentType } = httpResponse;
      res.status(statusCode).type(contentType).send(body);
    }
  });

  const port_used = process.env.PORT || HTTP_PORT;
  app.listen(port_used);
  print(`Server running at http://localhost:${port_used}`);
}
