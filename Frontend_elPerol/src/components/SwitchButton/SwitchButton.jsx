import './SwitchButton.css'

const SwitchButton = ({ className, isChecked, onChange }) => {
  return (
    <div className={`switch-container ${className}`}>
      <label className='switch'>
        <input type='checkbox' checked={isChecked} onChange={onChange} />
        <span className='slider'></span>
      </label>
    </div>
  )
}

export default SwitchButton
