import './Button.css'

const Button = ({
  buttonTitle = '',
  className = '',
  onClick = () => {},
  disabled = false
}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {buttonTitle}
    </button>
  )
}

export default Button
