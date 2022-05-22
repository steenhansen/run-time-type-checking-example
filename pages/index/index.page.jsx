import '../../tail-wind.css'
import { SquareRoot } from '../../jsx-components/SquareRoot'

export { Page }

function Page() {
  return (
    <>
      <SquareRoot></SquareRoot>
      <br /><br /><hr /><br />
      The point of this web page is to highlight the use of
      the <a className="base-link"
        href="https://github.com/steenhansen/type-czech">Type-Czech Javascript library</a>,
      a copy of Clojure's spec. The idea is to be able to have run-time type-checking in
      Javascript that can be toggled on and off.

      This program finds the square roots of four different types of numbers; words,
      Roman numerals, floats, and integers.
      <br /><br />
      Three different type errors occur with this program during fetch calls to the server.

      <ol className='pl-6 list-decimal list-inside'>
        <li >
          Function parameters of the wrong type
          <ul className='pl-6'>
            <li>For example, asking for the square root of 'four' when the specified number type is 'Roman'.</li>
            <li>Resulting in ***Error- 'four' is not a valid roman number I..MMMCMXCIX</li>
          </ul>
          <br />
        </li>
        <li> 
          Function result of the wrong type
          <ul className='pl-6'>
            <li>When asking for the square root of 'two' when using 'Word numbers' for instance.</li>
            <li>Producing ***ErrorCannot represent 1.4142135623730951 in Words</li>
          </ul>
        </li >
        <br />
        <li>
          Fetch not returning from server
          <ul className='pl-6'>
            <li>This occurs when asking for the square root of 'four' when the current number type is 'Roman', or using 'Unkown' number type.</li>
            <li>The error "Server did not respond because 'four' is not a Roman" will only manifest when Type-Czech is turned on.</li>
          </ul >
        </li >
        <br />

      </ol >

    </>

  )
}