import React, { useState } from 'react'
import { type_czech } from '../Type-Czech/make-Type-Czech-import';
import { SquareButton } from './SquareButton'
import { NumberEnter } from './NumberEnter'
import { BEGIN_SERVER_ERROR, numberStyle } from "../import-2-require/common-2-import";
import { NumberStyle } from './NumberStyle'
import { CheckingOnOff } from './CheckingOnOff'

import { PRE_serverGetSqrt, POST_serverGetSqrt } from '../Type-Czech/type-checks'

import { fakeConsole } from './fake-console';

export { SquareRoot }



// NB, if Type-Czech is turned off then both PRE_serverGetSqrt and POST_serverGetSqrt === undefined
serverGetSqrt = type_czech.linkUp(serverGetSqrt, PRE_serverGetSqrt, POST_serverGetSqrt);
async function serverGetSqrt(number_style, to_square) {
  try {
    const the_url = `/${number_style}/${to_square}`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', }
    };
    const get_response = await fetch(the_url, requestOptions)
    const num_style_sqrt_obj = await get_response.json();
    return num_style_sqrt_obj;
  } catch (e) {
    return ("serverGetSqrt-Error - " + e.message);
  }
}

function SquareRoot() {
  const [server_sqrt, setServerSqrt] = useState('?');
  const [to_square, setToSquare] = useState('xvi');
  const [number_style, setNumberStyle] = useState('roman-style');
  const [checking_on_off, setCheckingOnOff] = useState('On');

  async function squareTheNumber() {
    const fetched_number_type = numberStyle(number_style);
    fakeConsole();
    fakeConsole(' ');
    setServerSqrt('waiting for server ...')
    const num_style_sqrt_obj = await serverGetSqrt(number_style, to_square);
    const { _server_style, square_root } = num_style_sqrt_obj;
    if (square_root.startsWith(BEGIN_SERVER_ERROR)) {
      setServerSqrt('Unrepresentable in ' + fetched_number_type);
    } else {
      setServerSqrt(square_root)
    }
    fakeConsole(' ');
  }


  if (type_czech.isActive()) {
    if (!type_czech.isPruned()) {
      if (checking_on_off === 'On') {
        type_czech.enableTests();
      } else {
        type_czech.disableTests()
      }
    }
  }
  const num_rows = 7;
  return (
    <>
      <CheckingOnOff checking_on={checking_on_off} setChecking={setCheckingOnOff}     ></CheckingOnOff>

      <NumberStyle number_style={number_style} setNumberStyle={setNumberStyle} setServerSqrt={setServerSqrt}></NumberStyle>

      <NumberEnter to_square={to_square} setToSquare={setToSquare} setServerSqrt={setServerSqrt}> </NumberEnter>
      <SquareButton squareTheNumber={squareTheNumber} number_style={number_style}></SquareButton> &nbsp;&nbsp;
      <span className="text-xl">&#8730;</span><span className="-ml-0.5 overline">{to_square}</span> &nbsp; = &nbsp; {server_sqrt}
      <br /> <br />
      <textarea id='what-happens' className='w-full bg-gray-200' rows={num_rows}></textarea>
      <br />
      Open console to see run time type checking calls and errors.
    </>
  )
}


