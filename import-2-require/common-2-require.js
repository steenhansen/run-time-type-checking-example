const LARGEST_ROMAN = 3999;
const LARGEST_WORD_NUMBER = 999;

const INVALID_SQRT_HTTP = 400;
const VALID_SQRT_HTTP = 200;

const APP_TITLE = "Run Time Type Checks";
const APP_DESCRIPTION = "How to use Type-Czech for run time type checking";

const HTTP_PORT = 3000;
const MAX_TEST_AJAX_DELAY_SEC = 3007;
const BEGIN_SERVER_ERROR = "***Error";
const VALID_NUMBER_TYPES = ["word-style", "roman-style", "float-style", "integer-style"];
const SERVER_RESULT_SHAPE = { server_style: "string", square_root: "string" };

const DEFAULT_CONFIG = {
  G_TYPE_CZECH_ON: false,
  G_TYPE_CZECH_OPTIONS: [],
};
const NOP_TYPE_CZECH = {
  linkUp: (nop) => nop,
  isActive: (x) => false,
  isPruned: (y) => true,
  _from: "common-2-require",
};

function rootAppRequire(prog_root, name = "") {
  if (name === "") {
    return "using-heroku-env-vars--no-config-file";
  }
  var app_root_dir = path.join(prog_root, name);
  return require(app_root_dir);
}

function isNode() {
  let is_node = false;
  if (typeof process === "object") {
    if (typeof process.versions === "object") {
      if (typeof process.versions.node !== "undefined") {
        is_node = true;
      }
    }
  }
  return is_node;
}

function vanillaPageContext(server_varname) {
  const the_script = document.getElementById("vite-plugin-ssr_pageContext");
  if (the_script) {
    const server_values = JSON.parse(the_script.textContent);
    const server_value = server_values.pageContext[server_varname];
    return server_value;
  }
  return false;
}

function herokuEnvOrConfigFile(prog_root) {
  const credentials_file = process.argv[2];
  let the_config;
  if (credentials_file) {
    const { GLOBAL_CONFIG } = rootAppRequire(prog_root, credentials_file);
    if (GLOBAL_CONFIG) {
      the_config = GLOBAL_CONFIG;
    } else {
      the_config = {
        G_TYPE_CZECH_ON: false,
        G_TYPE_CZECH_OPTIONS: ["NO-CHECKING"],
      };
    }
  } else {
    const running_path = process.argv[1];
    const path_parts = running_path.split(path.sep);
    const run_prog = path_parts.pop();
    if (run_prog !== HEROKU_START) {
      throw "You forgot the credentials file, like ../dev-config.js"; // keep in case add passwords
    }
    the_config = DEFAULT_CONFIG;
  }
  return the_config;
}
function print(...args) {
  console.log(...args);
}

// https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric#1830844
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function numberStyle(browser_num_style) {
  const num_styles = browser_num_style.split("-");
  const number_type = num_styles[0];
  const fetched_number_type = number_type.charAt(0).toUpperCase() + number_type.slice(1);
  return fetched_number_type;
}

module.exports = {
  APP_DESCRIPTION,
  APP_TITLE,
  BEGIN_SERVER_ERROR,
  DEFAULT_CONFIG,
  HTTP_PORT,
  INVALID_SQRT_HTTP,
  VALID_SQRT_HTTP,
  LARGEST_ROMAN,
  LARGEST_WORD_NUMBER,
  MAX_TEST_AJAX_DELAY_SEC,
  NOP_TYPE_CZECH,
  SERVER_RESULT_SHAPE,
  VALID_NUMBER_TYPES,
  herokuEnvOrConfigFile,
  isNode,
  isNumeric,
  numberStyle,
  print,
  vanillaPageContext,
};

var path = require("path");
