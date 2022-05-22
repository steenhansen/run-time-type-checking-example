const { isNumeric , BEGIN_SERVER_ERROR} = require("./common-2-require");

const WORD_NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
  'twenty', 'twentyone', 'twentytwo', 'twentythree', 'twentyfour', 'twentyfive', 'twentysix', 'twentyseven', 'twentyeight', 'twentynine',
  'thirty', 'thirtyone', 'thirtytwo', 'thirtythree', 'thirtyfour', 'thirtyfive', 'thirtysix', 'thirtyseven', 'thirtyeight', 'thirtynine',
  'forty', 'fortyone', 'fortytwo', 'fortythree', 'fortyfour', 'fortyfive', 'fortysix', 'fortyseven', 'fortyeight', 'fortynine',
  'fifty', 'fiftyone', 'fiftytwo', 'fiftythree', 'fiftyfour', 'fiftyfive', 'fiftysix', 'fiftyseven', 'fiftyeight', 'fiftynine',
  'sixty', 'sixtyone', 'sixtytwo', 'sixtythree', 'sixtyfour', 'sixtyfive', 'sixtysix', 'sixtyseven', 'sixtyeight', 'sixtynine',
  'seventy', 'seventyone', 'seventytwo', 'seventythree', 'seventyfour', 'seventyfive', 'seventysix', 'seventyseven', 'seventyeight', 'seventynine',
  'eighty', 'eightyone', 'eightytwo', 'eightythree', 'eightyfour', 'eightyfive', 'eightysix', 'eightyseven', 'eightyeight', 'eightynine',
  'ninety', 'ninetyone', 'ninetytwo', 'ninetythree', 'ninetyfour', 'ninetyfive', 'ninetysix', 'ninetyseven', 'ninetyeight', 'ninetynine',
  'onehundred'];


function wordToInt(word_number) {
  if (typeof word_number === 'string') {
    const lower_word = word_number.toLowerCase();
    const alpha_only = lower_word.replace(/[^a-z]/g, '');
    if (alpha_only) {
      const spell_index = WORD_NUMBERS.indexOf(alpha_only);
      if (spell_index !== -1) {
        return spell_index;
      }
    }
  }
  const the_error = new Error(BEGIN_SERVER_ERROR + ', wordToInt() no such number from one to one-hundred')
  return the_error;
}

function intToWord(int_num) {
  if (!isNumeric(int_num)) return 'intToWord, not a number'
  if (int_num > 100) return 'intToWord, too big';
  if (int_num < 0) return 'intToWord, too small';

  const word_number = WORD_NUMBERS[int_num];
  return word_number;
}







module.exports = { wordToInt, intToWord };
