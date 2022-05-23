import { validRomanNumber, validWordNumber, validFloat, validInteger } from "../import-2-require/valid-types-import";
import React, { useState } from "react";

export { NumberEnter };

function NumberEnter({ to_square_root, setToSquare, setServerSqrt }) {
  const [word_color, setWordColor] = useState("text-rose-600");
  const [roman_color, setRomanColor] = useState("text-green-900");
  const [float_color, setFloatColor] = useState("text-rose-600");
  const [integer_color, setIntegerColor] = useState("text-rose-600");

  const numberChange = (event) => {
    setServerSqrt("?");
    const current_number = event.target.value;
    if (current_number === "") {
      setWordColor("");
      setRomanColor("");
      setFloatColor("");
      setIntegerColor("");
    } else {
      const word_error = validWordNumber("word-style", current_number);
      if (word_error) {
        setWordColor("text-rose-600");
      } else {
        setWordColor("text-green-900");
      }

      const roman_error = validRomanNumber("roman-style", current_number);
      if (roman_error) {
        setRomanColor("text-rose-600");
      } else {
        setRomanColor("text-green-900");
      }

      const float_error = validFloat("float-style", current_number);
      if (float_error) {
        setFloatColor("text-rose-600");
      } else {
        setFloatColor("text-green-900");
      }

      const integer_error = validInteger("integer-style", current_number);
      if (integer_error) {
        setIntegerColor("text-rose-600");
      } else {
        setIntegerColor("text-green-900");
      }
    }
    setToSquare(current_number);
  };

  return (
    <>
      <br />
      <span className={`${word_color}  font-semibold`}>Word</span>&nbsp;-&nbsp;
      <span className={`${roman_color}  font-semibold`}>Roman</span>
      &nbsp;-&nbsp;
      <span className={`${float_color}  font-semibold`}>Float</span>
      &nbsp;-&nbsp;
      <span className={`${integer_color}  font-semibold`}>Integer</span>
      <br />
      <input className="mr-5 w-[223px] base-edit" type="text" onChange={numberChange} value={to_square_root} />
    </>
  );
}
