
export { SquareButton }

const ButtonBase = ({ className, is_disabled, ...props }) => {
  return (
    <button className={['base-button', className].join(' ')} >
      {props.children}
    </button>
  );
};

function SquareButton({ squareTheNumber,number_style }) {
  const num_styles = number_style.split('-');
  const number_type = num_styles[0];
    return (
      <ButtonBase className=""   >
        <a onClick={squareTheNumber}>
          Calculate  <span className="sqrt-look">&#8730;</span><span className="-ml-0.5 overline">{number_type}</span>&nbsp;
          </a>
      </ButtonBase>
    )
  }

