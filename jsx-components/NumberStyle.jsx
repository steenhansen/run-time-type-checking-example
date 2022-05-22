export { NumberStyle }

function NumberStyle({ number_style, setNumberStyle , setServerSqrt}) {
  const styleChange = (event) => {
    setNumberStyle(event.target.value);
    setServerSqrt('?');
  }
  return (
    <div className="clear-both mt-2 bg-gray-200">
      <div className="clear-right mt-2">

        <label className='base-radio-label'>
          <input onChange={styleChange}  type="radio" 
            value="word-style" checked={number_style === "word-style"} /> Word numbers (four) </label>

        <label className='base-radio-label'>
          <input onChange={styleChange} type="radio"
            value="roman-style" checked={number_style === "roman-style"} /> Roman numerals (mcdxliv) </label>

        <label className='base-radio-label'>
          <input onChange={styleChange}  type="radio" 
            value="float-style" checked={number_style === "float-style"} /> Floats (1.2) </label>

        <label className='base-radio-label'>
          <input onChange={styleChange}  type="radio" 
            value="integer-style" checked={number_style === "integer-style"} /> Integers (-2) </label>

<label className='base-radio-label'>
          <input onChange={styleChange}  type="radio" 
            value="unknown-style" checked={number_style === "unknown-style"} /> Unknown (error) </label>



      </div>
    </div>
  )
}