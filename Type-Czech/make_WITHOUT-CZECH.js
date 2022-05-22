//  npm run prod-without-czech ./the-config.js

//  npm run dev-without-czech ./the-config.js

const fs = require('fs');
console.log("WITHOUT TypeCzech bundled");


const PROD_type_czechs = './Type-Czech/type-checks_WITHOUT-CZECH.js';
const undefined_type_czechs = './Type-Czech/type-checks.js';
fs.copyFileSync(PROD_type_czechs, undefined_type_czechs);



const PROD_type_czech_import_file = './Type-Czech/TypeCzech-2-import_WITHOUT-CZECH.js';
const compiled_type_czech_import = './Type-Czech/TypeCzech-2-import.js';
fs.copyFileSync(PROD_type_czech_import_file, compiled_type_czech_import);

const PROD_type_czech_require_file = './Type-Czech/TypeCzech-2-require_WITHOUT-CZECH.js';
const compiled_type_czech_require = './Type-Czech/TypeCzech-2-require.js';
fs.copyFileSync(PROD_type_czech_require_file, compiled_type_czech_require);
