import { type_czech } from "./make-Type-Czech-import";
import { numberStyle, MAX_TEST_AJAX_DELAY_SEC, BEGIN_SERVER_ERROR, VALID_NUMBER_TYPES, SERVER_RESULT_SHAPE } from "../import-2-require/common-2-import";
import { numberNotMatchType } from "../import-2-require/valid-types-import";
import { fakeConsole } from "../jsx-components/fake-console";
import { romanToInt } from "../import-2-require/roman-numbers-import";

export { PRE_serverGetSqrt, POST_serverGetSqrt };

function PRE_serverGetSqrt(browser_num_style, num_to_square) {
  const the_parameters = [browser_num_style, num_to_square];
  const the_types = ["string", "string"];
  const parameter_err = type_czech.checkParam_type(the_parameters, the_types); // warning not two strings
  if (parameter_err) {
    return parameter_err;
  }
  fetched_number_type = numberStyle(browser_num_style);
  fetched_value = num_to_square;
  if (!VALID_NUMBER_TYPES.includes(browser_num_style)) {
    const unknown_type = BEGIN_SERVER_ERROR + `- '${browser_num_style}' is not a valid type`;
    fakeConsole("Warning found : " + unknown_type); // warning 4<>Unknown type
    return unknown_type;
  }
  fakeConsole(`Checking that '${num_to_square}' is a ${fetched_number_type} before calling serverGetSqrt()`);
  const number_error = numberNotMatchType(browser_num_style, num_to_square);
  if (number_error) {
    fakeConsole("Warning PRE_serverGetSqrt() found : " + number_error); // warning 4<>Roman type
    fakeConsole(" ");
    return number_error;
  }
  fakeConsole(" ");
}

function POST_serverGetSqrt(square_promise) {
  if (!type_czech.typeIsA(square_promise, "Promise")) {
    return "POST_serverGetSqrt is not returning a promise, but instead a : " + square_promise.toString();
  }
  fakeConsole(`Waiting for serverGetSqrt() to return from server with the square root of '${fetched_value}' as a ${fetched_number_type} type`);
  let is_resolved = false;
  square_promise.then((num_style_sqrt_obj) => {
    //console.log("just got back from server---", num_style_sqrt_obj);
    if (num_style_sqrt_obj !== undefined) {
      is_resolved = true;
      const result_err = type_czech.checkParam_type(num_style_sqrt_obj, SERVER_RESULT_SHAPE);
      if (result_err) {
        return result_err;
      }
      const { square_root } = num_style_sqrt_obj;
      if (square_root.startsWith(BEGIN_SERVER_ERROR)) {
        type_czech.check_assert(`POST_serverGetSqrt return value of ${square_root}  `);
        fakeConsole(`serverGetSqrt() returned with the value of '${square_root}'`);
      } else {
        fakeConsole(`serverGetSqrt() returned with the value of '${square_root}' which is a ${fetched_number_type}`);
      }
      if (fetched_number_type === "Roman") {
        const start_number = romanToInt(fetched_value);
        const end_number = romanToInt(square_root);
        fakeConsole("Roman to decimal values " + end_number + "^2 = " + start_number);
      }
    }
  });

  setTimeout(() => (is_resolved ? console.log("server acknowledged fetch") : noServerAcknowledgement()), MAX_TEST_AJAX_DELAY_SEC);
}

var fetched_number_type = "";
var fetched_value = "";

function noServerAcknowledgement() {
  if (fetched_number_type === "Unknown") {
    fakeConsole(`Server did not respond because type of number was 'Unknown', not one of Word/Roman/Float/Integer`);
  } else {
    fakeConsole(`Server did not respond because '${fetched_value}' is not a ${fetched_number_type}`);
  }
  type_czech.check_assert(`POST_serverGetSqrt E did not return within ${MAX_TEST_AJAX_DELAY_SEC} milliseconds`);
}
