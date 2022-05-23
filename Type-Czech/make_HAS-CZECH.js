//  npm run prod-has-czech ./the-config.js

//  npm run dev-has-czech ./the-config.js

const fs = require("fs");
console.log("HAS TypeCzech bundled");

const DEV_type_czechs = "./Type-Czech/type-checks_HAS-CZECH.js";
const defined_type_czechs = "./Type-Czech/type-checks.js";
fs.copyFileSync(DEV_type_czechs, defined_type_czechs);

const DEV_type_czech_import_file = "./Type-Czech/TypeCzech-2-import_HAS-CZECH.js";
const compiled_type_czech_import = "./Type-Czech/TypeCzech-2-import.js";
fs.copyFileSync(DEV_type_czech_import_file, compiled_type_czech_import);

const DEV_type_czech_require_file = "./Type-Czech/TypeCzech-2-require_HAS-CZECH.js";
const compiled_type_czech_require = "./Type-Czech/TypeCzech-2-require.js";
fs.copyFileSync(DEV_type_czech_require_file, compiled_type_czech_require);
