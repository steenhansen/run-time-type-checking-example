const { isNumeric, BEGIN_SERVER_ERROR, LARGEST_WORD_NUMBER } = require("./common-2-require");
// prettier-ignore
const WORD_NUMBERS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
  'twenty', 'twentyone', 'twentytwo', 'twentythree', 'twentyfour', 'twentyfive', 'twentysix', 'twentyseven', 'twentyeight', 'twentynine',
  'thirty', 'thirtyone', 'thirtytwo', 'thirtythree', 'thirtyfour', 'thirtyfive', 'thirtysix', 'thirtyseven', 'thirtyeight', 'thirtynine',
  'forty', 'fortyone', 'fortytwo', 'fortythree', 'fortyfour', 'fortyfive', 'fortysix', 'fortyseven', 'fortyeight', 'fortynine',
  'fifty', 'fiftyone', 'fiftytwo', 'fiftythree', 'fiftyfour', 'fiftyfive', 'fiftysix', 'fiftyseven', 'fiftyeight', 'fiftynine',
  'sixty', 'sixtyone', 'sixtytwo', 'sixtythree', 'sixtyfour', 'sixtyfive', 'sixtysix', 'sixtyseven', 'sixtyeight', 'sixtynine',
  'seventy', 'seventyone', 'seventytwo', 'seventythree', 'seventyfour', 'seventyfive', 'seventysix', 'seventyseven', 'seventyeight', 'seventynine',
  'eighty', 'eightyone', 'eightytwo', 'eightythree', 'eightyfour', 'eightyfive', 'eightysix', 'eightyseven', 'eightyeight', 'eightynine',
  'ninety', 'ninetyone', 'ninetytwo', 'ninetythree', 'ninetyfour', 'ninetyfive', 'ninetysix', 'ninetyseven', 'ninetyeight', 'ninetynine',

  'onehundred', 'onehundredone', 'onehundredtwo', 'onehundredthree', 'onehundredfour', 'onehundredfive', 'onehundredsix', 'onehundredseven', 'onehundredeight', 'onehundrednine',
  'onehundredten', 'onehundredeleven', 'onehundredtwelve', 'onehundredthirteen', 'onehundredfourteen', 'onehundredfifteen', 'onehundredsixteen', 'onehundredseventeen', 'onehundredeighteen', 'onehundrednineteen',
  'onehundredtwenty', 'onehundredtwentyone', 'onehundredtwentytwo', 'onehundredtwentythree', 'onehundredtwentyfour', 'onehundredtwentyfive', 'onehundredtwentysix', 'onehundredtwentyseven', 'onehundredtwentyeight', 'onehundredtwentynine',
  'onehundredthirty', 'onehundredthirtyone', 'onehundredthirtytwo', 'onehundredthirtythree', 'onehundredthirtyfour', 'onehundredthirtyfive', 'onehundredthirtysix', 'onehundredthirtyseven', 'onehundredthirtyeight', 'onehundredthirtynine',
  'onehundredforty', 'onehundredfortyone', 'onehundredfortytwo', 'onehundredfortythree', 'onehundredfortyfour', 'onehundredfortyfive', 'onehundredfortysix', 'onehundredfortyseven', 'onehundredfortyeight', 'onehundredfortynine',
  'onehundredfifty', 'onehundredfiftyone', 'onehundredfiftytwo', 'onehundredfiftythree', 'onehundredfiftyfour', 'onehundredfiftyfive', 'onehundredfiftysix', 'onehundredfiftyseven', 'onehundredfiftyeight', 'onehundredfiftynine',
  'onehundredsixty', 'onehundredsixtyone', 'onehundredsixtytwo', 'onehundredsixtythree', 'onehundredsixtyfour', 'onehundredsixtyfive', 'onehundredsixtysix', 'onehundredsixtyseven', 'onehundredsixtyeight', 'onehundredsixtynine',
  'onehundredseventy', 'onehundredseventyone', 'onehundredseventytwo', 'onehundredseventythree', 'onehundredseventyfour', 'onehundredseventyfive', 'onehundredseventysix', 'onehundredseventyseven', 'onehundredseventyeight', 'onehundredseventynine',
  'onehundredeighty', 'onehundredeightyone', 'onehundredeightytwo', 'onehundredeightythree', 'onehundredeightyfour', 'onehundredeightyfive', 'onehundredeightysix', 'onehundredeightyseven', 'onehundredeightyeight', 'onehundredeightynine',
  'onehundredninety', 'onehundredninetyone', 'onehundredninetytwo', 'onehundredninetythree', 'onehundredninetyfour', 'onehundredninetyfive', 'onehundredninetysix', 'onehundredninetyseven', 'onehundredninetyeight', 'onehundredninetynine',

  'twohundred', 'twohundredone', 'twohundredtwo', 'twohundredthree', 'twohundredfour', 'twohundredfive', 'twohundredsix', 'twohundredseven', 'twohundredeight', 'twohundrednine',
  'twohundredten', 'twohundredeleven', 'twohundredtwelve', 'twohundredthirteen', 'twohundredfourteen', 'twohundredfifteen', 'twohundredsixteen', 'twohundredseventeen', 'twohundredeighteen', 'twohundrednineteen',
  'twohundredtwenty', 'twohundredtwentyone', 'twohundredtwentytwo', 'twohundredtwentythree', 'twohundredtwentyfour', 'twohundredtwentyfive', 'twohundredtwentysix', 'twohundredtwentyseven', 'twohundredtwentyeight', 'twohundredtwentynine',
  'twohundredthirty', 'twohundredthirtyone', 'twohundredthirtytwo', 'twohundredthirtythree', 'twohundredthirtyfour', 'twohundredthirtyfive', 'twohundredthirtysix', 'twohundredthirtyseven', 'twohundredthirtyeight', 'twohundredthirtynine',
  'twohundredforty', 'twohundredfortyone', 'twohundredfortytwo', 'twohundredfortythree', 'twohundredfortyfour', 'twohundredfortyfive', 'twohundredfortysix', 'twohundredfortyseven', 'twohundredfortyeight', 'twohundredfortynine',
  'twohundredfifty', 'twohundredfiftyone', 'twohundredfiftytwo', 'twohundredfiftythree', 'twohundredfiftyfour', 'twohundredfiftyfive', 'twohundredfiftysix', 'twohundredfiftyseven', 'twohundredfiftyeight', 'twohundredfiftynine',
  'twohundredsixty', 'twohundredsixtyone', 'twohundredsixtytwo', 'twohundredsixtythree', 'twohundredsixtyfour', 'twohundredsixtyfive', 'twohundredsixtysix', 'twohundredsixtyseven', 'twohundredsixtyeight', 'twohundredsixtynine',
  'twohundredseventy', 'twohundredseventyone', 'twohundredseventytwo', 'twohundredseventythree', 'twohundredseventyfour', 'twohundredseventyfive', 'twohundredseventysix', 'twohundredseventyseven', 'twohundredseventyeight', 'twohundredseventynine',
  'twohundredeighty', 'twohundredeightyone', 'twohundredeightytwo', 'twohundredeightythree', 'twohundredeightyfour', 'twohundredeightyfive', 'twohundredeightysix', 'twohundredeightyseven', 'twohundredeightyeight', 'twohundredeightynine',
  'twohundredninety', 'twohundredninetyone', 'twohundredninetytwo', 'twohundredninetythree', 'twohundredninetyfour', 'twohundredninetyfive', 'twohundredninetysix', 'twohundredninetyseven', 'twohundredninetyeight', 'twohundredninetynine',

  'threehundred', 'threehundredone', 'threehundredtwo', 'threehundredthree', 'threehundredfour', 'threehundredfive', 'threehundredsix', 'threehundredseven', 'threehundredeight', 'threehundrednine',
  'threehundredten', 'threehundredeleven', 'threehundredtwelve', 'threehundredthirteen', 'threehundredfourteen', 'threehundredfifteen', 'threehundredsixteen', 'threehundredseventeen', 'threehundredeighteen', 'threehundrednineteen',
  'threehundredtwenty', 'threehundredtwentyone', 'threehundredtwentytwo', 'threehundredtwentythree', 'threehundredtwentyfour', 'threehundredtwentyfive', 'threehundredtwentysix', 'threehundredtwentyseven', 'threehundredtwentyeight', 'threehundredtwentynine',
  'threehundredthirty', 'threehundredthirtyone', 'threehundredthirtytwo', 'threehundredthirtythree', 'threehundredthirtyfour', 'threehundredthirtyfive', 'threehundredthirtysix', 'threehundredthirtyseven', 'threehundredthirtyeight', 'threehundredthirtynine',
  'threehundredforty', 'threehundredfortyone', 'threehundredfortytwo', 'threehundredfortythree', 'threehundredfortyfour', 'threehundredfortyfive', 'threehundredfortysix', 'threehundredfortyseven', 'threehundredfortyeight', 'threehundredfortynine',
  'threehundredfifty', 'threehundredfiftyone', 'threehundredfiftytwo', 'threehundredfiftythree', 'threehundredfiftyfour', 'threehundredfiftyfive', 'threehundredfiftysix', 'threehundredfiftyseven', 'threehundredfiftyeight', 'threehundredfiftynine',
  'threehundredsixty', 'threehundredsixtyone', 'threehundredsixtytwo', 'threehundredsixtythree', 'threehundredsixtyfour', 'threehundredsixtyfive', 'threehundredsixtysix', 'threehundredsixtyseven', 'threehundredsixtyeight', 'threehundredsixtynine',
  'threehundredseventy', 'threehundredseventyone', 'threehundredseventytwo', 'threehundredseventythree', 'threehundredseventyfour', 'threehundredseventyfive', 'threehundredseventysix', 'threehundredseventyseven', 'threehundredseventyeight', 'threehundredseventynine',
  'threehundredeighty', 'threehundredeightyone', 'threehundredeightytwo', 'threehundredeightythree', 'threehundredeightyfour', 'threehundredeightyfive', 'threehundredeightysix', 'threehundredeightyseven', 'threehundredeightyeight', 'threehundredeightynine',
  'threehundredninety', 'threehundredninetyone', 'threehundredninetytwo', 'threehundredninetythree', 'threehundredninetyfour', 'threehundredninetyfive', 'threehundredninetysix', 'threehundredninetyseven', 'threehundredninetyeight', 'threehundredninetynine',

  'fourhundred', 'fourhundredone', 'fourhundredtwo', 'fourhundredthree', 'fourhundredfour', 'fourhundredfive', 'fourhundredsix', 'fourhundredseven', 'fourhundredeight', 'fourhundrednine',
  'fourhundredten', 'fourhundredeleven', 'fourhundredtwelve', 'fourhundredthirteen', 'fourhundredfourteen', 'fourhundredfifteen', 'fourhundredsixteen', 'fourhundredseventeen', 'fourhundredeighteen', 'fourhundrednineteen',
  'fourhundredtwenty', 'fourhundredtwentyone', 'fourhundredtwentytwo', 'fourhundredtwentythree', 'fourhundredtwentyfour', 'fourhundredtwentyfive', 'fourhundredtwentysix', 'fourhundredtwentyseven', 'fourhundredtwentyeight', 'fourhundredtwentynine',
  'fourhundredthirty', 'fourhundredthirtyone', 'fourhundredthirtytwo', 'fourhundredthirtythree', 'fourhundredthirtyfour', 'fourhundredthirtyfive', 'fourhundredthirtysix', 'fourhundredthirtyseven', 'fourhundredthirtyeight', 'fourhundredthirtynine',
  'fourhundredforty', 'fourhundredfortyone', 'fourhundredfortytwo', 'fourhundredfortythree', 'fourhundredfortyfour', 'fourhundredfortyfive', 'fourhundredfortysix', 'fourhundredfortyseven', 'fourhundredfortyeight', 'fourhundredfortynine',
  'fourhundredfifty', 'fourhundredfiftyone', 'fourhundredfiftytwo', 'fourhundredfiftythree', 'fourhundredfiftyfour', 'fourhundredfiftyfive', 'fourhundredfiftysix', 'fourhundredfiftyseven', 'fourhundredfiftyeight', 'fourhundredfiftynine',
  'fourhundredsixty', 'fourhundredsixtyone', 'fourhundredsixtytwo', 'fourhundredsixtythree', 'fourhundredsixtyfour', 'fourhundredsixtyfive', 'fourhundredsixtysix', 'fourhundredsixtyseven', 'fourhundredsixtyeight', 'fourhundredsixtynine',
  'fourhundredseventy', 'fourhundredseventyone', 'fourhundredseventytwo', 'fourhundredseventythree', 'fourhundredseventyfour', 'fourhundredseventyfive', 'fourhundredseventysix', 'fourhundredseventyseven', 'fourhundredseventyeight', 'fourhundredseventynine',
  'fourhundredeighty', 'fourhundredeightyone', 'fourhundredeightytwo', 'fourhundredeightythree', 'fourhundredeightyfour', 'fourhundredeightyfive', 'fourhundredeightysix', 'fourhundredeightyseven', 'fourhundredeightyeight', 'fourhundredeightynine',
  'fourhundredninety', 'fourhundredninetyone', 'fourhundredninetytwo', 'fourhundredninetythree', 'fourhundredninetyfour', 'fourhundredninetyfive', 'fourhundredninetysix', 'fourhundredninetyseven', 'fourhundredninetyeight', 'fourhundredninetynine',

  'fivehundred', 'fivehundredone', 'fivehundredtwo', 'fivehundredthree', 'fivehundredfour', 'fivehundredfive', 'fivehundredsix', 'fivehundredseven', 'fivehundredeight', 'fivehundrednine',
  'fivehundredten', 'fivehundredeleven', 'fivehundredtwelve', 'fivehundredthirteen', 'fivehundredfourteen', 'fivehundredfifteen', 'fivehundredsixteen', 'fivehundredseventeen', 'fivehundredeighteen', 'fivehundrednineteen',
  'fivehundredtwenty', 'fivehundredtwentyone', 'fivehundredtwentytwo', 'fivehundredtwentythree', 'fivehundredtwentyfour', 'fivehundredtwentyfive', 'fivehundredtwentysix', 'fivehundredtwentyseven', 'fivehundredtwentyeight', 'fivehundredtwentynine',
  'fivehundredthirty', 'fivehundredthirtyone', 'fivehundredthirtytwo', 'fivehundredthirtythree', 'fivehundredthirtyfour', 'fivehundredthirtyfive', 'fivehundredthirtysix', 'fivehundredthirtyseven', 'fivehundredthirtyeight', 'fivehundredthirtynine',
  'fivehundredforty', 'fivehundredfortyone', 'fivehundredfortytwo', 'fivehundredfortythree', 'fivehundredfortyfour', 'fivehundredfortyfive', 'fivehundredfortysix', 'fivehundredfortyseven', 'fivehundredfortyeight', 'fivehundredfortynine',
  'fivehundredfifty', 'fivehundredfiftyone', 'fivehundredfiftytwo', 'fivehundredfiftythree', 'fivehundredfiftyfour', 'fivehundredfiftyfive', 'fivehundredfiftysix', 'fivehundredfiftyseven', 'fivehundredfiftyeight', 'fivehundredfiftynine',
  'fivehundredsixty', 'fivehundredsixtyone', 'fivehundredsixtytwo', 'fivehundredsixtythree', 'fivehundredsixtyfour', 'fivehundredsixtyfive', 'fivehundredsixtysix', 'fivehundredsixtyseven', 'fivehundredsixtyeight', 'fivehundredsixtynine',
  'fivehundredseventy', 'fivehundredseventyone', 'fivehundredseventytwo', 'fivehundredseventythree', 'fivehundredseventyfour', 'fivehundredseventyfive', 'fivehundredseventysix', 'fivehundredseventyseven', 'fivehundredseventyeight', 'fivehundredseventynine',
  'fivehundredeighty', 'fivehundredeightyone', 'fivehundredeightytwo', 'fivehundredeightythree', 'fivehundredeightyfour', 'fivehundredeightyfive', 'fivehundredeightysix', 'fivehundredeightyseven', 'fivehundredeightyeight', 'fivehundredeightynine',
  'fivehundredninety', 'fivehundredninetyone', 'fivehundredninetytwo', 'fivehundredninetythree', 'fivehundredninetyfour', 'fivehundredninetyfive', 'fivehundredninetysix', 'fivehundredninetyseven', 'fivehundredninetyeight', 'fivehundredninetynine',

  'sixhundred', 'sixhundredone', 'sixhundredtwo', 'sixhundredthree', 'sixhundredfour', 'sixhundredfive', 'sixhundredsix', 'sixhundredseven', 'sixhundredeight', 'sixhundrednine',
  'sixhundredten', 'sixhundredeleven', 'sixhundredtwelve', 'sixhundredthirteen', 'sixhundredfourteen', 'sixhundredfifteen', 'sixhundredsixteen', 'sixhundredseventeen', 'sixhundredeighteen', 'sixhundrednineteen',
  'sixhundredtwenty', 'sixhundredtwentyone', 'sixhundredtwentytwo', 'sixhundredtwentythree', 'sixhundredtwentyfour', 'sixhundredtwentyfive', 'sixhundredtwentysix', 'sixhundredtwentyseven', 'sixhundredtwentyeight', 'sixhundredtwentynine',
  'sixhundredthirty', 'sixhundredthirtyone', 'sixhundredthirtytwo', 'sixhundredthirtythree', 'sixhundredthirtyfour', 'sixhundredthirtyfive', 'sixhundredthirtysix', 'sixhundredthirtyseven', 'sixhundredthirtyeight', 'sixhundredthirtynine',
  'sixhundredforty', 'sixhundredfortyone', 'sixhundredfortytwo', 'sixhundredfortythree', 'sixhundredfortyfour', 'sixhundredfortyfive', 'sixhundredfortysix', 'sixhundredfortyseven', 'sixhundredfortyeight', 'sixhundredfortynine',
  'sixhundredfifty', 'sixhundredfiftyone', 'sixhundredfiftytwo', 'sixhundredfiftythree', 'sixhundredfiftyfour', 'sixhundredfiftyfive', 'sixhundredfiftysix', 'sixhundredfiftyseven', 'sixhundredfiftyeight', 'sixhundredfiftynine',
  'sixhundredsixty', 'sixhundredsixtyone', 'sixhundredsixtytwo', 'sixhundredsixtythree', 'sixhundredsixtyfour', 'sixhundredsixtyfive', 'sixhundredsixtysix', 'sixhundredsixtyseven', 'sixhundredsixtyeight', 'sixhundredsixtynine',
  'sixhundredseventy', 'sixhundredseventyone', 'sixhundredseventytwo', 'sixhundredseventythree', 'sixhundredseventyfour', 'sixhundredseventyfive', 'sixhundredseventysix', 'sixhundredseventyseven', 'sixhundredseventyeight', 'sixhundredseventynine',
  'sixhundredeighty', 'sixhundredeightyone', 'sixhundredeightytwo', 'sixhundredeightythree', 'sixhundredeightyfour', 'sixhundredeightyfive', 'sixhundredeightysix', 'sixhundredeightyseven', 'sixhundredeightyeight', 'sixhundredeightynine',
  'sixhundredninety', 'sixhundredninetyone', 'sixhundredninetytwo', 'sixhundredninetythree', 'sixhundredninetyfour', 'sixhundredninetyfive', 'sixhundredninetysix', 'sixhundredninetyseven', 'sixhundredninetyeight', 'sixhundredninetynine',

  'sevenhundred', 'sevenhundredone', 'sevenhundredtwo', 'sevenhundredthree', 'sevenhundredfour', 'sevenhundredfive', 'sevenhundredsix', 'sevenhundredseven', 'sevenhundredeight', 'sevenhundrednine',
  'sevenhundredten', 'sevenhundredeleven', 'sevenhundredtwelve', 'sevenhundredthirteen', 'sevenhundredfourteen', 'sevenhundredfifteen', 'sevenhundredsixteen', 'sevenhundredseventeen', 'sevenhundredeighteen', 'sevenhundrednineteen',
  'sevenhundredtwenty', 'sevenhundredtwentyone', 'sevenhundredtwentytwo', 'sevenhundredtwentythree', 'sevenhundredtwentyfour', 'sevenhundredtwentyfive', 'sevenhundredtwentysix', 'sevenhundredtwentyseven', 'sevenhundredtwentyeight', 'sevenhundredtwentynine',
  'sevenhundredthirty', 'sevenhundredthirtyone', 'sevenhundredthirtytwo', 'sevenhundredthirtythree', 'sevenhundredthirtyfour', 'sevenhundredthirtyfive', 'sevenhundredthirtysix', 'sevenhundredthirtyseven', 'sevenhundredthirtyeight', 'sevenhundredthirtynine',
  'sevenhundredforty', 'sevenhundredfortyone', 'sevenhundredfortytwo', 'sevenhundredfortythree', 'sevenhundredfortyfour', 'sevenhundredfortyfive', 'sevenhundredfortysix', 'sevenhundredfortyseven', 'sevenhundredfortyeight', 'sevenhundredfortynine',
  'sevenhundredfifty', 'sevenhundredfiftyone', 'sevenhundredfiftytwo', 'sevenhundredfiftythree', 'sevenhundredfiftyfour', 'sevenhundredfiftyfive', 'sevenhundredfiftysix', 'sevenhundredfiftyseven', 'sevenhundredfiftyeight', 'sevenhundredfiftynine',
  'sevenhundredsixty', 'sevenhundredsixtyone', 'sevenhundredsixtytwo', 'sevenhundredsixtythree', 'sevenhundredsixtyfour', 'sevenhundredsixtyfive', 'sevenhundredsixtysix', 'sevenhundredsixtyseven', 'sevenhundredsixtyeight', 'sevenhundredsixtynine',
  'sevenhundredseventy', 'sevenhundredseventyone', 'sevenhundredseventytwo', 'sevenhundredseventythree', 'sevenhundredseventyfour', 'sevenhundredseventyfive', 'sevenhundredseventysix', 'sevenhundredseventyseven', 'sevenhundredseventyeight', 'sevenhundredseventynine',
  'sevenhundredeighty', 'sevenhundredeightyone', 'sevenhundredeightytwo', 'sevenhundredeightythree', 'sevenhundredeightyfour', 'sevenhundredeightyfive', 'sevenhundredeightysix', 'sevenhundredeightyseven', 'sevenhundredeightyeight', 'sevenhundredeightynine',
  'sevenhundredninety', 'sevenhundredninetyone', 'sevenhundredninetytwo', 'sevenhundredninetythree', 'sevenhundredninetyfour', 'sevenhundredninetyfive', 'sevenhundredninetysix', 'sevenhundredninetyseven', 'sevenhundredninetyeight', 'sevenhundredninetynine',

  'eighthundred', 'eighthundredone', 'eighthundredtwo', 'eighthundredthree', 'eighthundredfour', 'eighthundredfive', 'eighthundredsix', 'eighthundredseven', 'eighthundredeight', 'eighthundrednine',
  'eighthundredten', 'eighthundredeleven', 'eighthundredtwelve', 'eighthundredthirteen', 'eighthundredfourteen', 'eighthundredfifteen', 'eighthundredsixteen', 'eighthundredseventeen', 'eighthundredeighteen', 'eighthundrednineteen',
  'eighthundredtwenty', 'eighthundredtwentyone', 'eighthundredtwentytwo', 'eighthundredtwentythree', 'eighthundredtwentyfour', 'eighthundredtwentyfive', 'eighthundredtwentysix', 'eighthundredtwentyseven', 'eighthundredtwentyeight', 'eighthundredtwentynine',
  'eighthundredthirty', 'eighthundredthirtyone', 'eighthundredthirtytwo', 'eighthundredthirtythree', 'eighthundredthirtyfour', 'eighthundredthirtyfive', 'eighthundredthirtysix', 'eighthundredthirtyseven', 'eighthundredthirtyeight', 'eighthundredthirtynine',
  'eighthundredforty', 'eighthundredfortyone', 'eighthundredfortytwo', 'eighthundredfortythree', 'eighthundredfortyfour', 'eighthundredfortyfive', 'eighthundredfortysix', 'eighthundredfortyseven', 'eighthundredfortyeight', 'eighthundredfortynine',
  'eighthundredfifty', 'eighthundredfiftyone', 'eighthundredfiftytwo', 'eighthundredfiftythree', 'eighthundredfiftyfour', 'eighthundredfiftyfive', 'eighthundredfiftysix', 'eighthundredfiftyseven', 'eighthundredfiftyeight', 'eighthundredfiftynine',
  'eighthundredsixty', 'eighthundredsixtyone', 'eighthundredsixtytwo', 'eighthundredsixtythree', 'eighthundredsixtyfour', 'eighthundredsixtyfive', 'eighthundredsixtysix', 'eighthundredsixtyseven', 'eighthundredsixtyeight', 'eighthundredsixtynine',
  'eighthundredseventy', 'eighthundredseventyone', 'eighthundredseventytwo', 'eighthundredseventythree', 'eighthundredseventyfour', 'eighthundredseventyfive', 'eighthundredseventysix', 'eighthundredseventyseven', 'eighthundredseventyeight', 'eighthundredseventynine',
  'eighthundredeighty', 'eighthundredeightyone', 'eighthundredeightytwo', 'eighthundredeightythree', 'eighthundredeightyfour', 'eighthundredeightyfive', 'eighthundredeightysix', 'eighthundredeightyseven', 'eighthundredeightyeight', 'eighthundredeightynine',
  'eighthundredninety', 'eighthundredninetyone', 'eighthundredninetytwo', 'eighthundredninetythree', 'eighthundredninetyfour', 'eighthundredninetyfive', 'eighthundredninetysix', 'eighthundredninetyseven', 'eighthundredninetyeight', 'eighthundredninetynine',

  'ninehundred', 'ninehundredone', 'ninehundredtwo', 'ninehundredthree', 'ninehundredfour', 'ninehundredfive', 'ninehundredsix', 'ninehundredseven', 'ninehundredeight', 'ninehundrednine',
  'ninehundredten', 'ninehundredeleven', 'ninehundredtwelve', 'ninehundredthirteen', 'ninehundredfourteen', 'ninehundredfifteen', 'ninehundredsixteen', 'ninehundredseventeen', 'ninehundredeighteen', 'ninehundrednineteen',
  'ninehundredtwenty', 'ninehundredtwentyone', 'ninehundredtwentytwo', 'ninehundredtwentythree', 'ninehundredtwentyfour', 'ninehundredtwentyfive', 'ninehundredtwentysix', 'ninehundredtwentyseven', 'ninehundredtwentyeight', 'ninehundredtwentynine',
  'ninehundredthirty', 'ninehundredthirtyone', 'ninehundredthirtytwo', 'ninehundredthirtythree', 'ninehundredthirtyfour', 'ninehundredthirtyfive', 'ninehundredthirtysix', 'ninehundredthirtyseven', 'ninehundredthirtyeight', 'ninehundredthirtynine',
  'ninehundredforty', 'ninehundredfortyone', 'ninehundredfortytwo', 'ninehundredfortythree', 'ninehundredfortyfour', 'ninehundredfortyfive', 'ninehundredfortysix', 'ninehundredfortyseven', 'ninehundredfortyeight', 'ninehundredfortynine',
  'ninehundredfifty', 'ninehundredfiftyone', 'ninehundredfiftytwo', 'ninehundredfiftythree', 'ninehundredfiftyfour', 'ninehundredfiftyfive', 'ninehundredfiftysix', 'ninehundredfiftyseven', 'ninehundredfiftyeight', 'ninehundredfiftynine',
  'ninehundredsixty', 'ninehundredsixtyone', 'ninehundredsixtytwo', 'ninehundredsixtythree', 'ninehundredsixtyfour', 'ninehundredsixtyfive', 'ninehundredsixtysix', 'ninehundredsixtyseven', 'ninehundredsixtyeight', 'ninehundredsixtynine',
  'ninehundredseventy', 'ninehundredseventyone', 'ninehundredseventytwo', 'ninehundredseventythree', 'ninehundredseventyfour', 'ninehundredseventyfive', 'ninehundredseventysix', 'ninehundredseventyseven', 'ninehundredseventyeight', 'ninehundredseventynine',
  'ninehundredeighty', 'ninehundredeightyone', 'ninehundredeightytwo', 'ninehundredeightythree', 'ninehundredeightyfour', 'ninehundredeightyfive', 'ninehundredeightysix', 'ninehundredeightyseven', 'ninehundredeightyeight', 'ninehundredeightynine',
  'ninehundredninety', 'ninehundredninetyone', 'ninehundredninetytwo', 'ninehundredninetythree', 'ninehundredninetyfour', 'ninehundredninetyfive', 'ninehundredninetysix', 'ninehundredninetyseven', 'ninehundredninetyeight', 'ninehundredninetynine',

];

function wordToInt(word_number) {
  if (typeof word_number === "string") {
    const lower_word = word_number.toLowerCase();
    const alpha_only = lower_word.replace(/[^a-z]/g, "");
    if (alpha_only) {
      const spell_index = WORD_NUMBERS.indexOf(alpha_only);
      if (spell_index !== -1) {
        return spell_index;
      }
    }
  }
  const the_error = new Error(BEGIN_SERVER_ERROR + ", wordToInt() no such number from one to one-hundred");
  return the_error;
}

function intToWord(int_num) {
  if (!isNumeric(int_num)) return "intToWord, not a number";
  if (int_num > LARGEST_WORD_NUMBER) return "intToWord, too big";
  if (int_num < 0) return "intToWord, too small";

  const word_number = WORD_NUMBERS[int_num];
  return word_number;
}

module.exports = { wordToInt, intToWord };
