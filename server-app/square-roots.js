const {
  isNumeric,
  BEGIN_SERVER_ERROR,
} = require("../import-2-require/common-2-require");
const {
  romanToInt,
  intToRoman,
} = require("../import-2-require/roman-numbers-require");
const {
  wordToInt,
  intToWord,
} = require("../import-2-require/word-numbers-require");
const { numberTypeError } = require("../import-2-require/valid-types-require");

function romanSquareRoot(to_sqrt) {
  decimal_number = romanToInt(to_sqrt);
  if (decimal_number instanceof Error) {
    return decimal_number;
  }
  const decimal_sqrt = Math.sqrt(decimal_number);
  const integer_sqrt = Math.trunc(decimal_sqrt);
  let roman_result;
  if (decimal_sqrt === integer_sqrt) {
    roman_result = intToRoman(integer_sqrt);
  } else {
    roman_result = new Error(
      BEGIN_SERVER_ERROR +
        "Cannot represent " +
        decimal_sqrt +
        " in Roman numerals"
    );
  }
  return roman_result;
}

function wordSquareRoot(to_sqrt) {
  decimal_number = wordToInt(to_sqrt);
  if (decimal_number instanceof Error) {
    return decimal_number;
  }
  const decimal_sqrt = Math.sqrt(decimal_number);
  const integer_sqrt = Math.trunc(decimal_sqrt);
  let word_result;
  if (decimal_sqrt === integer_sqrt) {
    word_result = intToWord(integer_sqrt);
  } else {
    word_result = new Error(
      BEGIN_SERVER_ERROR + "Cannot represent " + decimal_sqrt + " in Words"
    );
  }
  return word_result;
}

function floatSquareRoot(to_sqrt) {
  if (!isNumeric(to_sqrt)) {
    const float_error = new Error(
      BEGIN_SERVER_ERROR + ", " + to_sqrt + " is not a number"
    );
    return float_error;
  }
  if (to_sqrt < 0) {
    const pos_float = Math.abs(to_sqrt);
    const neg_float_res = Math.sqrt(pos_float) + "i";
    return neg_float_res;
  }
  const pos_float_result = Math.sqrt(to_sqrt);
  return pos_float_result;
}

function integerSquareRoot(to_sqrt) {
  if (!isNumeric(to_sqrt)) {
    const not_int_error = new Error(
      BEGIN_SERVER_ERROR + ", " + to_sqrt + " is not a number"
    );
    return not_int_error;
  }
  const make_number = Number(to_sqrt);

  if (Math.trunc(make_number) != make_number) {
    const not_integer = new Error(
      BEGIN_SERVER_ERROR + ", " + make_number + " is not an integer"
    );
    return not_integer;
  }
  if (make_number < 0) {
    const pos_integer = Math.abs(make_number);
    const neg_int_sqrt = Math.sqrt(pos_integer);
    if (Math.trunc(neg_int_sqrt) === neg_int_sqrt) {
      return neg_int_sqrt + "i";
    }
    return new Error(
      BEGIN_SERVER_ERROR + ", " + neg_int_sqrt + "i is not an integer"
    );
  } else {
    const pos_int_sqrt = Math.sqrt(make_number);
    if (Math.trunc(pos_int_sqrt) === pos_int_sqrt) {
      return pos_int_sqrt;
    }
    return new Error(
      BEGIN_SERVER_ERROR + ", " + pos_int_sqrt + " is not an integer"
    );
  }
}

function getInputNumber(req) {
  const url_parts = req.url.split("/");
  const [_, number_style, to_sqrt] = url_parts;
  let square_root = "-2";
  if (number_style === "roman-style") {
    square_root = romanSquareRoot(to_sqrt);
  } else if (number_style === "word-style") {
    square_root = wordSquareRoot(to_sqrt);
  } else if (number_style === "float-style") {
    square_root = floatSquareRoot(to_sqrt);
  } else {
    square_root = integerSquareRoot(to_sqrt);
  }
  return { number_style, square_root, to_sqrt };
}

function returnSquareRoot(server_style, square_root, to_sqrt, res) {
  if (numberTypeError(server_style, to_sqrt)) {
    console.log("No acknowledgement as number type did not match the value");
  } else if (square_root instanceof Error) {
    const wrong_type_mess = square_root.message;
    const wrong_type_result = JSON.stringify({
      server_style,
      square_root: wrong_type_mess,
    });
    res.status(200).type("text/plain").send(wrong_type_result);
  } else {
    const square_root_str = square_root.toString();
    const server_result = JSON.stringify({
      server_style,
      square_root: square_root_str,
    });
    res.status(200).type("text/plain").send(server_result);
  }
}

module.exports = {
  getInputNumber,
  returnSquareRoot,
};
