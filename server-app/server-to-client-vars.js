module.exports = { PageContextInit };


async function PageContextInit(url) {
  const G_TYPE_CZECH_ON = global.GLOBAL_CONFIG.G_TYPE_CZECH_ON;
  const G_TYPE_CZECH_OPTIONS = global.GLOBAL_CONFIG.G_TYPE_CZECH_OPTIONS;
  const server_variables_init = {
    //pageProps,                // automatic sharing
    //routeParams,              // automatic sharing
    url,
    G_TYPE_CZECH_ON,
    G_TYPE_CZECH_OPTIONS,
  };
  return server_variables_init;
}
