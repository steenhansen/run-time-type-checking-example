import { BEGIN_SERVER_ERROR, isNumeric } from "../import-2-require/common-2-import";
import { romanToInt } from '../import-2-require/roman-numbers-import';
import { wordToInt } from '../import-2-require/word-numbers-import';

function validRomanNumber(number_style, num_to_square) {
  if (number_style === 'roman-style') {
    const roman_integer = romanToInt(num_to_square);
    if (!Number.isInteger(roman_integer)) {
      return BEGIN_SERVER_ERROR + `- '${num_to_square}' is not a valid roman number I..MMMCMXCIX`; 
    }
  }
}

function validWordNumber(number_style, num_to_square) {
  if (number_style === 'word-style') {
    const word_integer = wordToInt(num_to_square);
    if (!Number.isInteger(word_integer)) {
      return BEGIN_SERVER_ERROR + `- '${num_to_square}' is an invalid word-number`;
    }
  }
}

function validFloat(number_style, float_string) {
  if (number_style === 'float-style') {
    if (!isNumeric(float_string)) {
      return BEGIN_SERVER_ERROR + `- '${float_string}' is not a float`;
    }
  }
}

function validInteger(number_style, num_to_square) {
  if (number_style === 'integer-style') {
    const integer_num = Number(num_to_square);
    if (typeof integer_num !== 'number') {
      return BEGIN_SERVER_ERROR + `- '${num_to_square}' is not an integer`;
    }

    if (Math.trunc(integer_num) !== integer_num) {
      return BEGIN_SERVER_ERROR + `- '${num_to_square}' is not an integer`;
    }
  }
}


function numberNotMatchType(number_style, num_to_square) {
  const roman_error = validRomanNumber(number_style, num_to_square);
  if (roman_error) return roman_error;

  const word_error = validWordNumber(number_style, num_to_square);
  if (word_error) return word_error;

  const float_error = validFloat(number_style, num_to_square);
  if (float_error) return float_error;

  const integer_error = validInteger(number_style, num_to_square);
  if (integer_error) return integer_error;

  return '';
}



function numberTypeError(number_style, num_to_square) {
  let number_error;
  if (number_style === 'roman-style') {
    number_error = validRomanNumber(number_style, num_to_square);
  } else if (number_style === 'word-style') {
    number_error = validWordNumber(number_style, num_to_square);
  } else if (number_style === 'float-style') {
    number_error = validFloat(number_style, num_to_square);
  } else if (number_style === 'integer-style') {
    number_error = validInteger(number_style, num_to_square);
  } else {
    number_error = 'Unknown number type?';
  }
  return number_error;
}




export {
  validRomanNumber, validWordNumber, validFloat, validInteger,
  numberNotMatchType, numberTypeError
};