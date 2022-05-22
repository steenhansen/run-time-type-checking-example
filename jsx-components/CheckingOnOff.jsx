
export { CheckingOnOff }

function CheckingOnOff({ checking_on, setChecking }) {
  const checkingChange = (event) => setChecking(event.target.value);
  return (
    <div className="mt-2">
      <div className="clear-right mt-2">

        <label className='base-radio-label'>
          <input onChange={checkingChange}  type="radio"
            value="On" checked={checking_on === "On"} /> Run Time Type Checking On </label>

        <label className='base-radio-label'>
          <input onChange={checkingChange}  type="radio"
            value="Off" checked={checking_on === "Off"} /> Run Time Type Checking Off </label>
      </div>
    </div>
  )

}