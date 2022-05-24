import { isNumeric, BEGIN_SERVER_ERROR, LARGEST_ROMAN } from "./common-2-import";

function romanToInt(roman_str) {
  let thousand_digit = 0;
  let hundred_digit = 0;
  let ten_digit = 0;
  let one_digit = 0;
  let cur_column = "m_thousands";
  let started_d = false;
  let started_c = false;
  let started_l = false;
  let started_x = false;
  let started_v = false;
  let started_i = false;
  let next_char;
  let roman_seq;

  function doMs(cur_char) {
    if (cur_char === "m") {
      if (started_d) throw "dm";
      thousand_digit++;
      if (thousand_digit === 4) throw "mmmm";
      next_char = roman_seq.shift();
    } else {
      cur_column = "d_hundreds";
      next_char = cur_char;
    }
    return next_char;
  }

  function doDs(cur_char) {
    cur_column = "c_hundreds";
    if (cur_char === "d" && roman_seq[0] === "m") {
      throw "dm";
    } else if (cur_char === "d" && roman_seq[0] === "d") {
      throw "dd";
    } else if (cur_char === "d") {
      if (started_c) throw "ccd";
      if (started_d) throw "dd";
      started_d = true;
      hundred_digit = 5;
      next_char = roman_seq.shift();
    } else {
      next_char = cur_char;
    }
    return next_char;
  }

  function doCs(cur_char) {
    if (cur_char === "c" && roman_seq[0] === "m") {
      if (started_c) throw "ccm";
      started_c = true;
      const _use_up_m = roman_seq.shift();
      next_char = roman_seq.shift();
      hundred_digit = 9;
      cur_column = "l_tens";
    } else if (cur_char === "c" && roman_seq[0] === "d") {
      if (started_c) throw "ccd";
      if (started_d) throw "dcd";
      started_c = true;
      started_d = true;
      const _use_up_d = roman_seq.shift();
      next_char = roman_seq.shift();
      hundred_digit = 4;
      cur_column = "l_tens";
    } else if (cur_char === "c") {
      started_c = true;
      hundred_digit++;
      if (hundred_digit === 9) throw "dcccc";
      if (hundred_digit === 4) throw "cccc";
      next_char = roman_seq.shift();
    } else {
      cur_column = "l_tens";
      next_char = cur_char;
    }
    return next_char;
  }

  function doLs(cur_char) {
    cur_column = "x_tens";
    if (cur_char === "l" && roman_seq[0] === "c") {
      throw "lc";
    } else if (cur_char === "l" && roman_seq[0] === "l") {
      throw "ll";
    } else if (cur_char === "l") {
      if (started_x) throw "xxl";
      if (started_l) throw "ll";
      started_l = true;
      ten_digit = 5;
      next_char = roman_seq.shift();
    } else {
      next_char = cur_char;
    }
    return next_char;
  }

  function doXs(cur_char) {
    if (cur_char === "x" && roman_seq[0] === "c") {
      if (started_x) throw "xxc";
      started_x = true;
      started_c = true;
      const _use_up_c = roman_seq.shift();
      next_char = roman_seq.shift();
      ten_digit = 9;
      cur_column = "v_ones";
    } else if (cur_char === "x" && roman_seq[0] === "l") {
      if (started_x) throw "xxl";
      if (started_l) throw "lxl";
      started_x = true;
      started_l = true;
      const _use_up_l = roman_seq.shift();
      next_char = roman_seq.shift();
      ten_digit = 4;
      cur_column = "v_ones";
    } else if (cur_char === "x") {
      started_x = true;
      ten_digit++;
      if (ten_digit === 9) throw "lxxxx";
      if (ten_digit === 4) throw "xxxx";
      next_char = roman_seq.shift();
    } else {
      cur_column = "v_ones";
      next_char = cur_char;
    }
    return next_char;
  }

  function doVs(cur_char) {
    cur_column = "i_ones";
    if (cur_char === "v" && roman_seq[0] === "x") {
      throw "vx";
    } else if (cur_char === "v" && roman_seq[0] === "v") {
      throw "vv";
    } else if (cur_char === "v") {
      if (started_i) throw "iiv";
      if (started_v) throw "vv";
      started_v = true;
      one_digit = 5;
      next_char = roman_seq.shift();
    } else {
      next_char = cur_char;
    }
    return next_char;
  }

  function doIs(cur_char) {
    if (cur_char === "i" && roman_seq[0] === "x") {
      if (started_i) throw "iix";
      started_i = true;
      started_x = true;
      const _use_up_x = roman_seq.shift();
      one_digit = 9;
      cur_column = "z_zeros";
    } else if (cur_char === "i" && roman_seq[0] === "v") {
      if (started_i) throw "iiv";
      if (started_v) throw "viv";
      started_v = true;
      started_i = true;
      const _use_up_v = roman_seq.shift();
      one_digit = 4;
      cur_column = "z_zeros";
    } else if (cur_char === "i") {
      started_i = true;
      one_digit++;
      if (one_digit === 9) throw "viiii";
      if (one_digit === 4) throw "iiii";
      next_char = roman_seq.shift();
    } else {
      cur_column = "z_zeros";
      next_char = cur_char;
    }
    return next_char;
  }

  function processRoman(current_char) {
    if (cur_column === "m_thousands") next_char = doMs(current_char);
    else if (cur_column === "d_hundreds") next_char = doDs(current_char);
    else if (cur_column === "c_hundreds") next_char = doCs(current_char);
    else if (cur_column === "l_tens") next_char = doLs(current_char);
    else if (cur_column === "x_tens") next_char = doXs(current_char);
    else if (cur_column === "v_ones") next_char = doVs(current_char);
    else if (cur_column === "i_ones") next_char = doIs(current_char);
    return next_char;
  }

  try {
    if (typeof roman_str !== "string") throw "romanToInt(), not a string";
    const roman_lower = roman_str.toLowerCase();
    const trim_roman = roman_lower.trim();
    const not_ivxlcdm = trim_roman.match(/[^ivxlcdm]/g);
    if (not_ivxlcdm) throw "Invalid character(s) " + not_ivxlcdm.toString();
    roman_seq = trim_roman.split("");
    let roman_letter = roman_seq.shift();
    while (roman_letter && cur_column !== "z_zeros") {
      roman_letter = processRoman(roman_letter);
    }
    if (roman_seq.length > 0) {
      throw "invalid ending characters " + roman_seq.toString();
    }
    if (roman_letter === "i") {
      processRoman(roman_letter);
    } else if (roman_letter) {
      throw "last character '" + roman_letter + "' invalid";
    }
    const the_integer = one_digit + ten_digit * 10 + hundred_digit * 100 + thousand_digit * 1000;
    return Number(the_integer);
  } catch (e) {
    const the_error = new Error(BEGIN_SERVER_ERROR + ", romanToInt() " + e);
    return the_error;
  }
}

function intToRoman(int_num) {
  if (!isNumeric(int_num)) return "intToRoman, not a number";
  if (int_num > LARGEST_ROMAN) return "intToRoman, too big";
  if (int_num < 1) return new Error(BEGIN_SERVER_ERROR + " no zero in Roman ");

  // prettier-ignore
  const roman_sizes = [
  3000, 'mmm', 2000, 'mm', 1000, 'm',
    900, 'cm', 800, 'dccc', 700, 'dcc', 600, 'dc', 500, 'd',
    400, 'cd', 300, 'ccc', 200, 'cc', 100, 'c',
    90, 'xc', 80, 'lxxx', 70, 'lxx', 60, 'lx', 50, 'l',
    40, 'xl', 30, 'xxx', 20, 'xx', 10, 'x',
    9, 'ix', 8, 'viii', 7, 'vii', 6, 'vi', 5, 'v',
    4, 'iv', 3, 'iii', 2, 'ii', 1, 'i'
  ];
  let sub_num = int_num;
  let roman_text = "";
  for (let i = 0; i < roman_sizes.length; i += 2) {
    const column_size = roman_sizes[i];
    if (sub_num >= column_size) {
      const roman_column = roman_sizes[i + 1];
      sub_num -= column_size;
      roman_text += roman_column;
    }
  }
  return roman_text;
}

function testRomans() {
  console.log("start error output");
  for (let i = 1; i <= LARGEST_ROMAN; i++) {
    let roman_str = intToRoman(i);
    let int_num = romanToInt(roman_str);
    if (i != int_num) {
      console.log("testRomans() ", roman_str, int_num, i);
    }
  }

  if (romanToInt("ivx").message !== "***Error, romanToInt() invalid ending characters x") console.log(romanToInt("ivx"));
  if (romanToInt("ivm").message !== "***Error, romanToInt() invalid ending characters m") console.log(romanToInt("ivm"));

  if (romanToInt(7777).message !== "***Error, romanToInt() romanToInt(), not a string") console.log(romanToInt(7777));
  if (romanToInt("bad").message !== "***Error, romanToInt() Invalid character(s) b,a") console.log(romanToInt("bad"));

  if (romanToInt("im").message !== "***Error, romanToInt() last character 'm' invalid") console.log(romanToInt("im"));
  if (romanToInt("id").message !== "***Error, romanToInt() last character 'd' invalid") console.log(romanToInt("id"));
  if (romanToInt("ic").message !== "***Error, romanToInt() last character 'c' invalid") console.log(romanToInt("ic"));
  if (romanToInt("il").message !== "***Error, romanToInt() last character 'l' invalid") console.log(romanToInt("il"));

  if (romanToInt("vm").message !== "***Error, romanToInt() last character 'm' invalid") console.log(romanToInt("vm"));
  if (romanToInt("vd").message !== "***Error, romanToInt() last character 'd' invalid") console.log(romanToInt("vd"));
  if (romanToInt("vc").message !== "***Error, romanToInt() last character 'c' invalid") console.log(romanToInt("vc"));
  if (romanToInt("vl").message !== "***Error, romanToInt() last character 'l' invalid") console.log(romanToInt("vl"));
  if (romanToInt("vx").message !== "***Error, romanToInt() vx") console.log(romanToInt("vx"));
  if (romanToInt("vv").message !== "***Error, romanToInt() vv") console.log(romanToInt("vv"));

  if (romanToInt("xm").message !== "***Error, romanToInt() last character 'm' invalid") console.log(romanToInt("xm"));
  if (romanToInt("xd").message !== "***Error, romanToInt() last character 'd' invalid") console.log(romanToInt("xd"));

  if (romanToInt("lm").message !== "***Error, romanToInt() last character 'm' invalid") console.log(romanToInt("lm"));
  if (romanToInt("ld").message !== "***Error, romanToInt() last character 'd' invalid") console.log(romanToInt("ld"));
  if (romanToInt("lc").message !== "***Error, romanToInt() lc") console.log(romanToInt("lc"));
  if (romanToInt("ll").message !== "***Error, romanToInt() ll") console.log(romanToInt("ll"));

  if (romanToInt("dd").message !== "***Error, romanToInt() dd") console.log(romanToInt("dd"));
  if (romanToInt("dm").message !== "***Error, romanToInt() dm") console.log(romanToInt("dm"));

  if (romanToInt("iiii").message !== "***Error, romanToInt() iiii") console.log(romanToInt("iiii"));
  if (romanToInt("viiii").message !== "***Error, romanToInt() viiii") console.log(romanToInt("viiii"));
  if (romanToInt("iix").message !== "***Error, romanToInt() iix") console.log(romanToInt("iix"));
  if (romanToInt("viv").message !== "***Error, romanToInt() viv") console.log(romanToInt("viv"));
  if (romanToInt("iiv").message !== "***Error, romanToInt() iiv") console.log(romanToInt("iiv"));

  if (romanToInt("xxxx").message !== "***Error, romanToInt() xxxx") console.log(romanToInt("xxxx"));
  if (romanToInt("lxxxx").message !== "***Error, romanToInt() lxxxx") console.log(romanToInt("lxxxx"));
  if (romanToInt("xxc").message !== "***Error, romanToInt() xxc") console.log(romanToInt("xxc"));
  if (romanToInt("lxl").message !== "***Error, romanToInt() lxl") console.log(romanToInt("lxl"));
  if (romanToInt("xxl").message !== "***Error, romanToInt() xxl") console.log(romanToInt("xxl"));

  if (romanToInt("cccc").message !== "***Error, romanToInt() cccc") console.log(romanToInt("cccc"));
  if (romanToInt("dcccc").message !== "***Error, romanToInt() dcccc") console.log(romanToInt("dcccc"));
  if (romanToInt("ccm").message !== "***Error, romanToInt() ccm") console.log(romanToInt("ccm"));
  if (romanToInt("dcd").message !== "***Error, romanToInt() dcd") console.log(romanToInt("dcd"));
  if (romanToInt("ccd").message !== "***Error, romanToInt() ccd") console.log(romanToInt("ccd"));

  if (romanToInt("mmmm").message !== "***Error, romanToInt() mmmm") console.log(romanToInt("mmmm"));
  console.log("end   error output");
}

//testRomans();

export { romanToInt, intToRoman };
